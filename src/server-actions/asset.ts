"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import { assetServices } from "@/services/asset";

export const createAssetAction = withServerAction<typeof assetServices.create>(
  assetServices.create,
);

export const getAllAssetAction = withServerAction<typeof assetServices.getAll>(
  assetServices.getAll,
);
