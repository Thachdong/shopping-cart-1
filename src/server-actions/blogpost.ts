"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import {
  createBlogpostService,
  getPostOptionsService,
} from "@/services/blogpost-services";

export const createBlogpostAction = withServerAction<
  typeof createBlogpostService
>(createBlogpostService);

export const getPostOptionsAction = withServerAction<
  typeof getPostOptionsService
>(getPostOptionsService);
