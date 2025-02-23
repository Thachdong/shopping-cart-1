"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import {
  createBlogpostService,
  getPostOptionsService,
  updatePostGeneralInfoService,
  updatePostService,
} from "@/services/blogpost-services";

export const createBlogpostAction = withServerAction<
  typeof createBlogpostService
>(createBlogpostService);

export const getPostOptionsAction = withServerAction<
  typeof getPostOptionsService
>(getPostOptionsService);

export const updatePostGeneralInfoAction = withServerAction<
  typeof updatePostGeneralInfoService
>(updatePostGeneralInfoService);

export const updatePostAction =
  withServerAction<typeof updatePostService>(updatePostService);
