import { prisma } from "@/database/prisma-client";
import { TSelectOption } from "@/types/form";
import { TCreateProduct, TProductDetail, TProductTable } from "@/types/product";
import { assetServices } from "./asset";
import { ES3Folder } from "@/constants";
import { copyS3FileService, deleteS3FileService } from "./s3-services";

const productRepository = prisma.product;
const variantRepository = prisma.variant;

/**
 * Creates a new product along with its associated assets and variants.
 *
 * This function performs the following steps:
 * 1. Creates assets for the display image and thumbnails.
 * 2. Creates a new product in the product repository.
 * 3. Creates a variant for the product with the associated thumbnails.
 * 4. Copies the S3 files from the temporary folder to the product folder.
 * 5. Removes the temporary S3 files.
 *
 * @param data - The data required to create a new product, including:
 *   - collectionIds: The IDs of the collections the product belongs to.
 *   - blogpostIds: The IDs of the blog posts associated with the product.
 *   - thumbnails: An array of thumbnail files.
 *   - displayImage: The display image file.
 *   - name: The name of the product.
 *   - description: The description of the product.
 *   - variant: Additional variant data.
 *
 * @returns A promise that resolves when the product creation process is complete.
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

  // CREATE ASSETS
  const displayImageId = await assetServices.create({
    filename: displayImage.filename,
    folder: ES3Folder.PRODUCT,
    variantId: null,
    userId: null,
  });

  const thumbnailIds = await Promise.all(
    thumbnails.map((file) =>
      assetServices.create({
        filename: file.filename,
        folder: ES3Folder.PRODUCT,
        variantId: null,
        userId: null,
      }),
    ),
  );

  // CREATE PRODUCT
  const product = await productRepository.create({
    data: {
      name,
      description,
      displayImageId,
      collections: {
        connect: collectionIds.map((collId) => ({ id: collId })),
      },
      blogposts: {
        connect: blogpostIds.map((postId) => ({ id: postId })),
      },
    },
  });

  // CREATE VARIANT
  console.log(thumbnailIds);
  await variantRepository.create({
    data: {
      ...variant,
      thumbnails: {
        connect: thumbnailIds.map((thumbId) => ({ id: thumbId })),
      },
      productId: product.id,
    },
  });

  // UPDATE S3 FILES
  await copyS3FileService(
    displayImage.filename,
    ES3Folder.TMP,
    ES3Folder.PRODUCT,
  );

  await Promise.all(
    thumbnails.map((file) =>
      copyS3FileService(file.filename, ES3Folder.TMP, ES3Folder.PRODUCT),
    ),
  );

  // REMOVE TEMP FILE
  deleteS3FileService([displayImage.folder, displayImage.filename].join("/"));

  thumbnails.map((file) =>
    deleteS3FileService([file.folder, file.filename].join("/")),
  );
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
          percentOff: true,
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
          percentOff: true,
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
