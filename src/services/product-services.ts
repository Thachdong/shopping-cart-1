import { prisma } from "@/database/prisma-client";
import { TSelectOption } from "@/types/form";

const productRepository = prisma.product;

// export async function createProductService(data: TCreateProductForm): Promise<void> {
//     const { collectionIds, blogpostIds, } = data;
// }

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
