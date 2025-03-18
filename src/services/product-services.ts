import { prisma } from "@/database/prisma-client";
import { TSelectOption } from "@/types/form";
import {
  TCreateProduct,
  TCreateVariantServiceParams,
  TProductDetail,
  TProductTable,
  TUpdateProductGeneralInfoServiceParam,
} from "@/types/product";
import { ES3Folder } from "@/constants";
import { copyS3FileService, deleteS3FileService } from "./s3-services";

const productRepository = prisma.product;

/**
 * Creates a new product along with its associated assets and variants.
 *
 * @param productData -- name, description
 * @param displayImage -- uploaded file
 * @param variant -- variant data
 * @param collectionIds -- connect to collections
 * @param blogpostIds -- connect to blogposts
 * @returns Promise<void>
 */
export async function createProductService(
  data: TCreateProduct,
): Promise<void> {
  const {
    collectionIds = [],
    blogpostIds = [],
    thumbnails = [],
    displayImage,
    name,
    description,
    ...variant
  } = data;

  await productRepository.create({
    data: {
      name,
      description,
      displayImage: {
        create: {
          filename: displayImage.filename,
          folder: ES3Folder.PRODUCT,
        },
      },
      variants: {
        create: [
          {
            ...variant,
            discountPrice: variant.discountPrice,
            thumbnails: {
              create: thumbnails.map((thmb) => ({
                filename: thmb.filename,
                folder: ES3Folder.PRODUCT,
              })),
            },
          },
        ],
      },
      collections: {
        create: collectionIds.map((id) => ({
          collection: {
            connect: { id },
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
    },
  });

  // UPDATE S3 FILES
  copyS3FileService(
    displayImage.filename,
    ES3Folder.TMP,
    ES3Folder.PRODUCT,
  ).then(() => {
    deleteS3FileService([displayImage.folder, displayImage.filename].join("/"));
  });

  Promise.all(
    thumbnails.map((file) =>
      copyS3FileService(file.filename, ES3Folder.TMP, ES3Folder.PRODUCT),
    ),
  ).then(() => {
    thumbnails.map((file) =>
      deleteS3FileService([file.folder, file.filename].join("/")),
    );
  });
}

/**
 * Fetches product options from the product repository.
 *
 * This function retrieves a list of products from the product repository,
 * selecting only the `id` and `name` fields. It then maps these products
 * to an array of `TSelectOption` objects, where each object contains a
 * `value` (product id) and a `label` (product name).
 *
 * @returns {Promise<TSelectOption[]>} A promise that resolves to an array of product options.
 */
export async function getProductOptionsService(): Promise<TSelectOption[]> {
  const products = await productRepository.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const options: TSelectOption[] = products.map((prd) => ({
    value: prd.id,
    label: prd.name,
  }));

  return options;
}

/**
 * Retrieves a table of products with their variants from the product repository.
 *
 * @returns {Promise<TProductTable[]>} A promise that resolves to an array of products,
 * each containing its variants. The `createdAt` fields for both products and variants
 * are converted to ISO string format.
 *
 * @example
 * const productsTable = await getProductsTable();
 * console.log(productsTable);
 * // [
 * //   {
 * //     id: 'product1',
 * //     name: 'Product 1',
 * //     description: 'Description for product 1',
 * //     createdAt: '2023-01-01T00:00:00.000Z',
 * //     variants: [
 * //       {
 * //         id: 'variant1',
 * //         variantName: 'Variant 1',
 * //         price: 100,
 * //         stock: 10,
 * //         percentOff: 0,
 * //         createdAt: '2023-01-01T00:00:00.000Z',
 * //       },
 * //       // more variants...
 * //     ],
 * //   },
 * //   // more products...
 * // ]
 */
export async function getProductsTable(): Promise<TProductTable[]> {
  const products = await productRepository.findMany({
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
        },
      },
    },
  });

  return products.map((product) => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    variants: product.variants.map((variant) => ({
      ...variant,
      createdAt: variant.createdAt.toISOString(),
    })),
  }));
}

/**
 * Retrieves the detailed information of a product by its ID.
 *
 * @param {number} id - The unique identifier of the product.
 * @returns {Promise<TProductDetail | null>} A promise that resolves to the product detail object if found, otherwise null.
 *
 * The returned product detail object includes:
 * - `id`: The unique identifier of the product.
 * - `name`: The name of the product.
 * - `description`: The description of the product.
 * - `createdAt`: The creation date of the product in ISO string format.
 * - `updatedAt`: The last update date of the product in ISO string format.
 * - `collections`: An array of collections the product belongs to, each containing:
 *   - `id`: The unique identifier of the collection.
 *   - `name`: The name of the collection.
 * - `blogposts`: An array of blog posts related to the product, each containing:
 *   - `id`: The unique identifier of the blog post.
 *   - `title`: The title of the blog post.
 * - `variants`: An array of product variants, each containing:
 *   - `id`: The unique identifier of the variant.
 *   - `variantName`: The name of the variant.
 *   - `price`: The price of the variant.
 *   - `stock`: The stock quantity of the variant.
 *   - `percentOff`: The discount percentage of the variant.
 *   - `createdAt`: The creation date of the variant in ISO string format.
 *   - `thumbnails`: The thumbnails of the variant.
 */
export async function getProductDetailService(
  id: number,
): Promise<TProductDetail | null> {
  const product = await productRepository.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
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
      blogposts: {
        select: {
          blogpost: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      variants: {
        select: {
          id: true,
          variantName: true,
          size: true,
          color: true,
          price: true,
          stock: true,
          discountPercent: true,
          createdAt: true,
          thumbnails: true,
        },
      },
    },
  });

  if (product) {
    return {
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      collections: product.collections.map((coll) => ({
        id: coll.collection.id,
        name: coll.collection.name,
      })),
      blogposts: product.blogposts.map((post) => ({
        id: post.blogpost.id,
        title: post.blogpost.title,
      })),
      variants: product.variants.map((variant) => ({
        ...variant,
        createdAt: variant.createdAt.toISOString(),
      })),
    };
  }
  return null;
}

/**
 * Update product general data: name, description, related collections, related blogposts
 *
 * @param id number -- collection id
 * @param data -- general data
 * @returns Promise<void>
 */
export async function updateProductGeneralInfoService(
  id: number,
  data: TUpdateProductGeneralInfoServiceParam,
) {
  const { collectionIds, blogpostIds, ...rest } = data || {};

  await productRepository.update({
    where: { id },
    data: {
      ...rest,
      ...(Array.isArray(collectionIds) && {
        collections: {
          set: collectionIds.map((collectionId) => ({ id: collectionId })),
        },
      }),
      ...(Array.isArray(blogpostIds) && {
        blogposts: {
          set: blogpostIds.map((blogpostId) => ({ id: blogpostId })),
        },
      }),
    },
  });
}

/**
 * Create and add variant for a Product
 * 1. Create variant and add it to product
 * 2. Update and cleanup temp files
 *
 * @param id number -- product id
 * @param data variant name, price, color, stock, size, percent off, thumnails
 * @returns Promise<void>
 */
export async function createVariantService(
  id: number,
  data: TCreateVariantServiceParams,
) {
  const { thumbnails, ...rest } = data || {};

  await productRepository.update({
    where: { id },
    data: {
      variants: {
        create: [
          {
            ...rest,
            thumbnails: {
              create: thumbnails.map((thb) => ({
                filename: thb.filename,
                folder: ES3Folder.PRODUCT,
              })),
            },
          },
        ],
      },
    },
  });

  // UPDATE THUMBNAILS FOLDER
  Promise.all(
    thumbnails.map((thb) =>
      copyS3FileService(thb.filename, ES3Folder.TMP, ES3Folder.PRODUCT),
    ),
  ).then(() => {
    thumbnails.map((thb) =>
      deleteS3FileService([thb.folder, thb.filename].join("/")),
    );
  });
}

/**
 * Remove variant
 * 1. get product
 * 2. remove and delete variant
 * 3. cleanup thumnails
 *
 * @param id number -- product id
 * @param variantId number -- variant id
 * @returns Promise<void>
 */
export async function removeVariantService(
  id: number,
  variantId: number,
): Promise<void> {
  // Fetch the variant to get its thumbnails
  const product = await productRepository.findFirst({
    where: { id, variants: { some: { id: variantId } } },
    select: {
      variants: {
        where: { id: variantId },
        select: {
          id: true,
          thumbnails: true,
        },
      },
    },
  });

  if (product) {
    // Delete the variant
    await productRepository.update({
      where: { id },
      data: {
        variants: {
          delete: { id: variantId },
        },
      },
    });

    // Delete associated thumbnails from S3
    const thumbnailFiles =
      product.variants.find((v) => v.id === variantId)?.thumbnails || [];

    Promise.all(
      thumbnailFiles.map(({ filename, folder }) =>
        deleteS3FileService([folder, filename].join("/")),
      ),
    );
  }
}
