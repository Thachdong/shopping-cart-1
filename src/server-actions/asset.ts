"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import { assetServices } from "@/services/asset";
import { Asset } from "@prisma/client";

export const createAssetAction = withServerAction<
  TPrismaCreateData<Asset>,
  void
>(assetServices.create);

export const getAllAssetAction = withServerAction<undefined, Asset[]>(
  assetServices.getAll,
);
