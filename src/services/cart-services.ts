import { prisma } from "@/database/prisma-client";

const cartRepository = prisma.cart;

/**
 * Get products in cart by user id
 *
 * @param userId int
 * @implements
 * - find cart by user id
 * - get and format products in cart
 *
 * @returns list of products in cart
 */
export async function getCartByUserIdService(
  userId: number,
): Promise<TProductInCart[]> {
  const cart = await cartRepository.findFirst({
    where: {
      userId,
    },
    select: {
      products: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              variantName: true,
              price: true,
              discountPercent: true,
              discountPrice: true,
            },
          },
        },
      },
    },
  });

  if (cart === null) {
    console.log("create cart", userId);
    await cartRepository.create({
      data: {
        products: {
          create: [],
        },
        userId,
      },
    });
    console.log("create cart end");

    return [];
  }

  const products = cart.products.map(({ quantity, product }) => {
    const total = product.discountPrice
      ? product.discountPrice * quantity
      : product.price * quantity;

    const { variantName, ...rest } = product || {};
    return {
      quantity,
      total,
      name: variantName,
      ...rest,
    };
  });

  return products;
}

/**
 * Add product to cart
 *
 * @param userId int
 * @param productId int
 * @param quantity int
 *
 * @implements
 * - find cart by user id
 * - add product to cart
 *
 * @returns void
 */
export async function addProductToCartService(
  userId: number,
  productId: number,
  quantity: number,
): Promise<void> {
  await cartRepository.update({
    where: {
      userId,
    },
    data: {
      products: {
        create: {
          quantity,
          productId,
        },
      },
    },
  });
}

/**
 * Remove product from cart
 *
 * @param userId int
 * @param productId int
 *
 * @implements
 * - find cart by user id
 * - remove product from cart
 *
 * @returns void
 */
export async function removeProductFromCartService(
  userId: number,
  productId: number,
): Promise<void> {
  await cartRepository.update({
    where: {
      userId,
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
 * Update product quantity in cart
 *
 * @param userId int
 * @param productId int
 * @param quantity int
 *
 * @implements
 * - find cart by user id
 * - update product quantity in cart
 *
 * @returns void
 */
export async function updateProductQuantityService(
  userId: number,
  productId: number,
  quantity: number,
): Promise<void> {
  await cartRepository.update({
    where: {
      userId,
    },
    data: {
      products: {
        updateMany: {
          where: {
            productId,
          },
          data: {
            quantity,
          },
        },
      },
    },
  });
}
