"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import { createBlogpostService } from "@/services/blogpost-services";

export const createBlogpostAction = withServerAction<
  typeof createBlogpostService
>(createBlogpostService);
