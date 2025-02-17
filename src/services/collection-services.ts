import { prisma } from "@/database/prisma-client";
import { createPagination } from "./base-service";
import { Collection } from "@prisma/client";
import { TSelectOption } from "@/types/form";
import { ES3Folder, MAX_PAGE_SIZE } from "@/constants";
import { TCreateCollection } from "@/types/collections";
import { assetServices } from "./asset";
import { deleteS3File } from "./s3-services";

const collectionRepository = prisma.collection;

export async function getCollOptionsService(): Promise<TSelectOption[]> {
  const collections = await collectionRepository.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const options: TSelectOption[] = collections.map((coll) => ({
    value: coll.id,
    label: coll.name,
  }));

  return options;
}

export async function getCollectionsService(
  pageNumber?: number,
  pageSize?: number,
): Promise<TPaginationResponse<Collection>> {
  return await createPagination(
    collectionRepository,
    pageNumber || 1,
    pageSize || MAX_PAGE_SIZE,
  );
}

export async function getCollectionById(
  id: number,
): Promise<Collection | null> {
  return await collectionRepository.findFirst({
    where: { id },
    include: {
      products: true,
      blogposts: true,
    },
  });
}

export async function createCollectionService(
  data: TCreateCollection,
): Promise<void> {
  const { banner, productIds, blogpostIds, ...rest } = data;

  console.log(productIds, blogpostIds);

  // CREATE BANNER ASSET
  const bannerId = await assetServices.create({
    filename: banner?.filename as string,
    folder: ES3Folder.COLLECTION,
    variantId: null,
    userId: null,
  });

  // CREATE COLLECTION
  const payload = { ...rest, bannerId };

  await collectionRepository.create({ data: payload });

  // REMOVE TEMP BANNER FILE
  await deleteS3File(banner?.filename as string);
}

// update collection service

// add product to collection service

// add post to service
