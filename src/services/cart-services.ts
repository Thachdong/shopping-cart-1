import { prisma } from "@/database/prisma-client";

const cartRepository = prisma.cart;

export async function getCartByUserIdService(userId: number) {
  const cart = await cartRepository.findFirst({
    where: {
      userId,
    },
    select: {
      products: {
        select: {
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

  return cart;
}
