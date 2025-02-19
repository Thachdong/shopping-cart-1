import { prisma } from "@/database/prisma-client";
import { TSelectOption } from "@/types/form";
import { TCreateProduct, TProductTable } from "@/types/product";
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
