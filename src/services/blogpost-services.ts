import { prisma } from "@/database/prisma-client";
import { TSelectOption } from "@/types/form";

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
        create: productIds.map((id) => ({
          product: {
            connect: { id },
          },
        })),
      },
      collections: {
        create: collectionIds.map((id) => ({
          collection: {
            connect: { id },
          },
        })),
      },
    },
  });
}

/**
 * Fetches and returns a list of blog posts with selected fields.
 *
 * This service retrieves blog posts from the repository and includes
 * the following fields: id, title, description, publishDate, products,
 * and collections. The publishDate is converted to an ISO string format.
 * The products and collections fields are nested objects that include
 * the id and name of each product and collection respectively.
 *
 * @returns {Promise<TBlogpost[]>} A promise that resolves to an array of blog posts.
 */
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

/**
 * Retrieves a blog post by its ID.
 *
 * @param id - The unique identifier of the blog post.
 * @returns A promise that resolves to the blog post details if found, otherwise null.
 *
 * The returned blog post details include:
 * - `id`: The unique identifier of the blog post.
 * - `title`: The title of the blog post.
 * - `description`: The description of the blog post.
 * - `post`: The content of the blog post.
 * - `publishDate`: The publish date of the blog post in ISO string format.
 * - `products`: An array of associated products, each containing:
 *   - `id`: The unique identifier of the product.
 *   - `name`: The name of the product.
 * - `collections`: An array of associated collections, each containing:
 *   - `id`: The unique identifier of the collection.
 *   - `name`: The name of the collection.
 */
export async function getBlogpostByIdService(
  id: number,
): Promise<TBlogpostDetail | null> {
  const post = await blogpostRepository.findFirst({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      post: true,
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

  if (post) {
    return {
      ...post,
      publishDate: post.publishDate.toISOString(),
      products: post.products.map(({ product }) => ({
        id: product.id,
        name: product.name,
      })),
      collections: post.collections.map(({ collection }) => ({
        id: collection.id,
        name: collection.name,
      })),
    };
  }
  return null;
}

/**
 * Fetches a list of blog posts and transforms them into select options.
 *
 * @returns {Promise<TSelectOption[]>} A promise that resolves to an array of select options,
 * where each option contains the `id` as the value and the `title` as the label.
 *
 * @throws {Error} If there is an issue fetching the blog posts from the repository.
 */
export async function getPostOptionsService(): Promise<TSelectOption[]> {
  const posts = await blogpostRepository.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  const options: TSelectOption[] = posts.map((pst) => ({
    value: pst.id,
    label: pst.title,
  }));

  return options;
}
