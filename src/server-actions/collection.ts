"use server";
import { withServerAction } from "@/libs/hocs/with-server-action";
import {
  createCollectionService,
  getCollOptionsService,
} from "@/services/collection-services";

export const createCollectionAction = withServerAction<
  typeof createCollectionService
>(createCollectionService);

export const getCollOptionsAction = withServerAction<
  typeof getCollOptionsService
>(getCollOptionsService);
