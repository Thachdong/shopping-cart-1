"use server";

import { withServerAction } from "@/libs/hocs/with-server-action";
import { createUserService } from "@/services/user-services";

export const createUserAction =
  withServerAction<typeof createUserService>(createUserService);
