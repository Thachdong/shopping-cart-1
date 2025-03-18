"use server";
import { withServerAction } from "@/libs/hocs/with-server-action";
import { getAuthenticatedUser } from "@/services/auth-services";
import {
  addProductToCartService,
  getCartByUserIdService,
  removeProductFromCartService,
  updateProductQuantityService,
} from "@/services/cart-services";

// #region -- get cart action
async function getCart() {
  const user = await getAuthenticatedUser();

  return await getCartByUserIdService(user.id);
}

export const getCartAction = withServerAction<typeof getCart>(getCart);
// #endregion

// #region -- add product to cart action
async function addProductToCart(productId: number, quantity: number) {
  const user = await getAuthenticatedUser();

  await addProductToCartService(user.id, productId, quantity);
}

export const addProductToCartAction =
  withServerAction<typeof addProductToCart>(addProductToCart);
// #endregion

// #region -- remove product from cart action
async function removeProductFromCart(productId: number) {
  const user = await getAuthenticatedUser();

  await removeProductFromCartService(user.id, productId);
}

export const removeProductFromCartAction = withServerAction<
  typeof removeProductFromCart
>(removeProductFromCart);
// #endregion

// #region -- update product quantity action
async function updateProductQuantity(productId: number, quantity: number) {
  const user = await getAuthenticatedUser();

  await updateProductQuantityService(user.id, productId, quantity);
}

export const updateProductQuantityAction = withServerAction<
  typeof updateProductQuantity
>(updateProductQuantity);
// #endregion
