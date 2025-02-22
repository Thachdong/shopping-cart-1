"use server";
import { withServerAction } from "@/libs/hocs/with-server-action";
import {
  addPostsToCollService,
  addProductsToCollService,
  createCollectionService,
  getCollOptionsService,
  getPostsByCollIdService,
  getProductsByCollIdService,
  removeCollPostService,
  removeCollProductService,
  updateCollGeneralInfoService,
} from "@/services/collection-services";

export const createCollectionAction = withServerAction<
  typeof createCollectionService
>(createCollectionService);

export const getCollOptionsAction = withServerAction<
  typeof getCollOptionsService
>(getCollOptionsService);

export const updateCollGeneralInfoAction = withServerAction<
  typeof updateCollGeneralInfoService
>(updateCollGeneralInfoService);

export const addProductsToCollAction = withServerAction<
  typeof addProductsToCollService
>(addProductsToCollService);

export const addPostsToCollAction = withServerAction<
  typeof addPostsToCollService
>(addPostsToCollService);

export const removeCollProductAction = withServerAction<
  typeof removeCollProductService
>(removeCollProductService);

export const removeCollPostAction = withServerAction<
  typeof removeCollPostService
>(removeCollPostService);

export const getProductsByCollIdAction = withServerAction<
  typeof getProductsByCollIdService
>(getProductsByCollIdService);

export const getPostsByCollIdAction = withServerAction<
  typeof getPostsByCollIdService
>(getPostsByCollIdService);
