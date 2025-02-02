import { prisma } from "@/database/prisma-client";
import { generateBaseService } from "./base-service";
import { Asset } from "@prisma/client";

const { create, getAll } = generateBaseService<Asset>(prisma.asset);

export const assetServices = {
  create,
  getAll,
};
