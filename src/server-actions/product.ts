"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import {
  createProductService,
  createVariantService,
  getProductOptionsService,
  removeVariantService,
  updateProductGeneralInfoService,
} from "@/services/product-services";

export const createProductAction =
  withServerAction<typeof createProductService>(createProductService);

export const getProductOptionsAction = withServerAction<
  typeof getProductOptionsService
>(getProductOptionsService);

export const updateProductGeneralInfoAction = withServerAction<
  typeof updateProductGeneralInfoService
>(updateProductGeneralInfoService);

export const createVariantAction =
  withServerAction<typeof createVariantService>(createVariantService);

export const removeVariantAction =
  withServerAction<typeof removeVariantService>(removeVariantService);
