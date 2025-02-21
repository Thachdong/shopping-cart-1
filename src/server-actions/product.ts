"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import {
  createProductService,
  getProductOptionsService,
} from "@/services/product-services";

export const createProductAction =
  withServerAction<typeof createProductService>(createProductService);

export const getProductOptionsAction = withServerAction<
  typeof getProductOptionsService
>(getProductOptionsService);
