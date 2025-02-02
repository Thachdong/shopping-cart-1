import { CURRENT_PAGE, PAGE_SIZE } from "@/constants";
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

  const pagination = async function (
    params?: TPaginationParams<T>,
  ): Promise<TPaginationResponse<T>> {
    const {
      pageNumber = CURRENT_PAGE,
      pageSize = PAGE_SIZE,
      ...filterParams
    } = params || {};

    const total = await source.count(filterParams);

    const skip = (pageNumber - 1) * pageSize;

    const items: T[] = await source.findMany({
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

  const create = async function (data: TPrismaCreateData<T>): Promise<void> {
    await source.create({ data });
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
