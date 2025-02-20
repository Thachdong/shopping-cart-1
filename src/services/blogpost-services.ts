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

  await blogpostRepository.create({
    data: {
      ...rest,
      publishDate: new Date(publishDate),
      products: {
        connect: productIds.map((id) => ({ id })),
      },
      collections: {
        connect: collectionIds.map((id) => ({ id })),
      },
    },
  });
}

export async function getBlogpostsTableService(): Promise<TBlogpost[]> {
  const blogposts = await blogpostRepository.findMany({
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
  });

  return blogposts.map((blogpost) => ({
    ...blogpost,
    publishDate: blogpost.publishDate.toISOString(),
    products: blogpost.products.map(({ product }) => ({
      id: product.id,
      name: product.name,
    })),
    collections: blogpost.collections.map(({ collection }) => ({
      id: collection.id,
      name: collection.name,
    })),
  }));
}
