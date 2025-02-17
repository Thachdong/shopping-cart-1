import { CURRENT_PAGE, MAX_PAGE_SIZE } from "@/constants";
import { PrismaClient } from "@prisma/client/extension";

export const generateBaseService = <T>(
  source: PrismaClient,
): TBaseService<T> => {
  const getAll = async function (
    params?: TPrismaDelegateParams<T>,
  ): Promise<T[]> {
    const result: T[] = await source.findMany(params);

    return result;
  };

  const pagination = async <K>(
    params?: TPaginationParams<T>,
  ): Promise<TPaginationResponse<K>> => {
    const {
      pageNumber = CURRENT_PAGE,
      pageSize = MAX_PAGE_SIZE,
      ...filterParams
    } = params || {};

    const total = await source.count(filterParams);

    const skip = (pageNumber - 1) * pageSize;

    const items: K[] = await source.findMany({
      ...filterParams,
      take: pageSize,
      skip,
    });

    const nextPage = items.length > 0 ? pageNumber + 1 : null;

    return {
      nextPage,
      total,
      items,
    };
  };

  const findFirst = async function (
    params?: TPrismaDelegateParams<T>,
  ): Promise<T | null> {
    const item: T | null = await source.findFirst(params);

    return item;
  };

  const create = async function (data: TPrismaCreateData<T>): Promise<number> {
    const result = await source.create({ data });

    return result?.id;
  };

  const update = async function (
    id: number,
    data: TPrismaUpdateData<T>,
  ): Promise<void> {
    await source.update({
      where: {
        id,
      },
      data,
    });
  };

  const remove = async function (id: number): Promise<void> {
    await source.delete({ where: { id } });
  };

  return {
    getAll,
    pagination,
    findFirst,
    create,
    update,
    remove,
  };
};

export async function createPagination<T>(
  dataSource: PrismaClient,
  pageNumber: number,
  pageSize: number,
): Promise<TPaginationResponse<T>> {
  // TOTAL
  const total: number = await dataSource.count();

  // TAKE
  let take = MAX_PAGE_SIZE;

  if (pageSize > 0 && pageSize < MAX_PAGE_SIZE) {
    take = pageSize;
  }

  // SKIP
  const skip = (pageNumber - 1) * take;

  // ITEMS
  const items = await dataSource.findMany({
    take,
    skip,
  });

  // NEXT_PAGE
  let nextPage = null;

  if (items.length > 0) {
    nextPage = pageNumber + 1;
  }

  return {
    total,
    nextPage,
    items,
  };
}
