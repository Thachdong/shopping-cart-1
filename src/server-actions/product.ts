"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import { createProductService } from "@/services/product-services";

export const createProductAction =
  withServerAction<typeof createProductService>(createProductService);
