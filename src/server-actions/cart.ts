"use server";
import { withServerAction } from "@/libs/hocs/with-server-action";
import { getCartByUserIdService } from "@/services/cart-services";

export const getCartByUserIdAction = withServerAction<
  typeof getCartByUserIdService
>(getCartByUserIdService);
