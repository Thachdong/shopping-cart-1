import { prisma } from "@/database/prisma-client";

const blogpostRepository = prisma.blogpost;

/**
 * Creates a new blog post schema in the repository.
 *
 * @param data - The data required to create a blog post schema.
 * @param data.productIds - An array of product IDs to be connected to the blog post.
 * @param data.collectionIds - An array of collection IDs to be connected to the blog post.
 * @param data.rest - The remaining properties of the blog post schema.
 * @returns A promise that resolves when the blog post schema is created.
 */
export async function createBlogpostService(
  data: TCreateBlogpost,
): Promise<void> {
  const {
    productIds = [],
    collectionIds = [],
    publishDate,
    ...rest
  } = data || {};

  console.log(publishDate);

  await blogpostRepository.create({
    data: {
      ...rest,
      products: {
        connect: productIds.map((id) => ({ id })),
      },
      collections: {
        connect: collectionIds.map((id) => ({ id })),
      },
    },
  });
}
