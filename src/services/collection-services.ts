import { prisma } from "@/database/prisma-client";
import { createPagination } from "./base-service";
import { TSelectOption } from "@/types/form";
import { ES3Folder, MAX_PAGE_SIZE } from "@/constants";
import {
  TAdminCollection,
  TAdminCollectionDetail,
  TCreateCollection,
  TUpdateCollGeneralInfo,
} from "@/types/collections";
import { copyS3FileService, deleteS3FileService } from "./s3-services";
import { TProductCard, TProductTable } from "@/types/product";

const collectionRepository = prisma.collection;

/**
 * Fetches collection options from the repository and maps them to a format suitable for selection inputs.
 *
 * @returns {Promise<TSelectOption[]>} A promise that resolves to an array of select options,
 * each containing a value (collection ID) and a label (collection name).
 */
export async function getCollOptionsService(): Promise<TSelectOption[]> {
  const collections = await collectionRepository.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const options: TSelectOption[] = collections.map((coll) => ({
    value: coll.id,
    label: coll.name,
  }));

  return options;
}

/**
 * Retrieves a paginated list of collections.
 *
 * @param {number} [pageNumber] - The page number to retrieve. Defaults to 1 if not provided.
 * @param {number} [pageSize] - The number of items per page. Defaults to MAX_PAGE_SIZE if not provided.
 * @returns {Promise<TPaginationResponse<Collection>>} A promise that resolves to a paginated response of collections.
 */
export async function getCollectionsService(
  pageNumber?: number,
  pageSize?: number,
): Promise<TPaginationResponse<TAdminCollection>> {
  return await createPagination(
    collectionRepository,
    pageNumber || 1,
    pageSize || MAX_PAGE_SIZE,
  );
}

/**
 * Retrieves a collection by its ID.
 *
 * @param {number} id - The ID of the collection to retrieve.
 * @returns {Promise<Collection | null>} A promise that resolves to the collection if found, or null if not found.
 */
export async function getCollectionById(
  id: number,
): Promise<TAdminCollectionDetail | null> {
  const result = await collectionRepository.findFirst({
    where: { id },
    include: {
      banner: true,
    },
  });

  if (result) {
    const { banner, ...rest } = result;
    return {
      ...rest,
      banner: {
        id: banner.id,
        folder: banner.folder,
        filename: banner.filename,
      },
      createdAt: result.createdAt.toISOString(),
    };
  }

  return null;
}

/**
 * Creates a new collection service.
 *
 * @param {TCreateCollection} data - The data required to create the collection.
 * @throws {Error} If the banner is not provided.
 * @returns {Promise<void>} A promise that resolves when the collection is created.
 *
 * The function performs the following steps:
 * 1. Extracts the banner, productIds, blogpostIds, and other properties from the input data.
 * 2. Checks if the banner filename is provided, and throws an error if not.
 * 3. Creates a banner asset using the provided filename and folder.
 * 4. Creates a collection with the provided data, connecting the products and blogposts by their IDs.
 * 5. Moves the banner file to the COLLECTION folder in S3.
 * 6. Deletes the temporary banner file from the TMP folder in S3.
 */
export async function createCollectionService(
  data: TCreateCollection,
): Promise<void> {
  const { banner, productIds, blogpostIds, ...rest } = data;

  const { filename, folder } = banner || {};

  if (!filename) {
    throw new Error("Banner is required!");
  }

  // CREATE COLLECTION
  await collectionRepository.create({
    data: {
      ...rest,
      products: {
        create: productIds.map((id) => ({
          product: {
            connect: {
              id,
            },
          },
        })),
      },
      blogposts: {
        create: blogpostIds.map((id) => ({
          blogpost: {
            connect: { id },
          },
        })),
      },
      banner: {
        create: {
          filename,
          folder: ES3Folder.COLLECTION,
          variantId: null,
          userId: null,
        },
      },
    },
  });

  // MOVE BANNER TO /COLLECTION FOLDER
  await copyS3FileService(filename, ES3Folder.TMP, ES3Folder.COLLECTION);

  // REMOVE TEMP BANNER FILE
  await deleteS3FileService([folder, filename].join("/"));
}

/**
 * Updates the general information of a collection.
 *
 * @param {TUpdateCollGeneralInfo} data - The data to update the collection with.
 * @param {string} data.id - The ID of the collection to update.
 * @param {object} [data.banner] - The banner information to update.
 * @param {string} data.banner.filename - The filename of the banner.
 * @param {string} data.banner.folder - The folder where the banner is stored.
 * @param {object} rest - The rest of the collection data to update.
 *
 * @throws {Error} If the banner filename is not provided.
 *
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export async function updateCollGeneralInfoService(
  data: TUpdateCollGeneralInfo,
) {
  const { id, banner, ...rest } = data;

  if (banner) {
    const { filename, folder } = banner;

    if (!filename) {
      throw new Error("Banner filename is required!");
    }

    // Update banner
    await collectionRepository.update({
      where: { id },
      data: {
        ...rest,
        banner: {
          update: {
            filename,
            folder: ES3Folder.COLLECTION,
          },
        },
      },
    });

    // MOVE BANNER TO /COLLECTION FOLDER
    await copyS3FileService(filename, ES3Folder.TMP, ES3Folder.COLLECTION);

    // REMOVE TEMP BANNER FILE
    await deleteS3FileService([folder, filename].join("/"));
  } else {
    // Update collection without banner
    await collectionRepository.update({
      where: { id },
      data: rest,
    });
  }
}

/**
 * find all products belong to collection
 *
 * @param id: number -- collection id
 * @returns products: Promise<TProductTable[]> -- list of products
 */
export async function getProductsByCollIdService(
  id: number,
): Promise<TProductTable[]> {
  const collection = await collectionRepository.findFirst({
    where: { id },
    select: {
      products: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              createdAt: true,
              variants: {
                select: {
                  id: true,
                  variantName: true,
                  price: true,
                  stock: true,
                  discountPercent: true,
                  createdAt: true,
                  discountPrice: true,
                  thumbnails: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const products =
    collection?.products.map(({ product }) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      createdAt: product.createdAt.toISOString(),
      variants: product.variants.map((variant) => ({
        ...variant,
        createdAt: variant.createdAt.toISOString(),
      })),
    })) || [];

  return products;
}

/**
 * find all posts belong to collection
 *
 * @param id: number -- collection id
 * @returns posts: Promise<TBlogpost[]> -- list of posts
 */
export async function getPostsByCollIdService(
  id: number,
): Promise<TBlogpost[]> {
  const collection = await collectionRepository.findFirst({
    where: { id },
    select: {
      blogposts: {
        select: {
          blogpost: {
            select: {
              id: true,
              title: true,
              description: true,
              publishDate: true,
              products: {
                select: {
                  product: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
              collections: {
                select: {
                  collection: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const posts =
    collection?.blogposts.map(({ blogpost }) => ({
      id: blogpost.id,
      title: blogpost.title,
      description: blogpost.description,
      publishDate: blogpost.publishDate.toISOString(),
      products: blogpost.products.map(({ product }) => ({
        id: product.id,
        name: product.name,
      })),
      collections: blogpost.collections.map(({ collection }) => ({
        id: collection.id,
        name: collection.name,
      })),
    })) || [];

  return posts;
}

/**
 * Add products to collection
 *
 * @param id: number -- collection id
 * @param productIds: number -- list of product id
 * @returns Promise<void>
 */
export async function addProductsToCollService(
  id: number,
  productIds: number[],
): Promise<void> {
  await collectionRepository.update({
    where: { id },
    data: {
      products: {
        create: productIds.map((productId) => ({
          product: {
            connect: { id: productId },
          },
        })),
      },
    },
  });
}

/**
 * Add posts to collection
 *
 * @param id: number -- collection id
 * @param postIds: number -- list of post id
 * @returns Promise<void>
 */
export async function addPostsToCollService(
  id: number,
  postIds: number[],
): Promise<void> {
  await collectionRepository.update({
    where: {
      id,
    },
    data: {
      blogposts: {
        create: postIds.map((id) => ({
          blogpost: {
            connect: { id },
          },
        })),
      },
    },
  });
}

/**
 * Remove Product out of collection
 *
 * @param id: number -- collection id
 * @param productId: number -- product id
 * @returns Promise<void>
 */
export async function removeCollProductService(
  id: number,
  productId: number,
): Promise<void> {
  await collectionRepository.update({
    where: {
      id,
    },
    data: {
      products: {
        deleteMany: {
          productId,
        },
      },
    },
  });
}

/**
 * Remove Post out of collection
 *
 * @param id: number -- collection id
 * @param blogpostId: number -- post id
 * @returns Promise<void>
 */
export async function removeCollPostService(
  id: number,
  blogpostId: number,
): Promise<void> {
  await collectionRepository.update({
    where: {
      id,
    },
    data: {
      blogposts: {
        deleteMany: {
          blogpostId,
        },
      },
    },
  });
}

/**
 * Get product by collection id
 *
 * @param id: number -- collection id
 *
 *  @returns products list
 */
export async function getClientProductByCollId(
  id: number,
): Promise<TProductCard[]> {
  const collection = await collectionRepository.findFirst({
    where: { id },
    select: {
      products: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              variants: {
                select: {
                  price: true,
                  discountPercent: true,
                  discountPrice: true,
                  stock: true,
                  thumbnails: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const products =
    collection?.products.map(({ product }) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.variants[0]?.price || 0,
      discountPercent: product.variants[0]?.discountPercent || 0,
      discountPrice: product.variants[0]?.discountPrice || 0,
      stock: product.variants[0]?.stock || 0,
      thumbnails: product.variants[0]?.thumbnails,
    })) || [];

  return products;
}
