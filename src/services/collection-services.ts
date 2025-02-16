import { prisma } from "@/database/prisma-client";
import { createPagination } from "./base-service";
import { Collection } from "@prisma/client";
import { TSelectOption } from "@/types/form";
import { MAX_PAGE_SIZE } from "@/constants";

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
  await collectionRepository.create({ data });
}

// update collection service

// add product to collection service

// add post to service
