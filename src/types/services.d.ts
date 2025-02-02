type TSortOrder = {
  asc: "asc";
  desc: "desc";
};

type TPickPrismaKey<T> = {
  [K in keyof T]?: boolean;
};

type TPrismaSort<T> = {
  [K in keyof T]?: TSortOrder;
};

type TPrismaWhere<T> = {
  [K in keyof T]?: T[K];
};

type TPrismaWhereExtended<T> = TPrismaWhere<T> & {
  AND?: TPrismaWhere<T> | TPrismaWhere<T>[];
  OR?: TPrismaWhere<T>[];
  NOT?: TPrismaWhere<T> | TPrismaWhere<T>[];
};

type TPrismaDelegateParams<T> = {
  select?: TPickPrismaKey<T>;
  omit?: TPickPrismaKey<T>;
  include?: TPickPrismaKey<T>;
  where?: TPrismaWhereExtended<T>;
  orderBy?: TPrismaSort<T>;
  take?: number;
  skip?: number;
};

type TPrismaCreateData<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

type TPrismaUpdateData<T> = Partial<TPrismaCreateData<T>>;

type TPaginationParams<T> = Omit<TPrismaDelegateParams<T>, "take" | "skip"> & {
  pageNumber?: number;
  pageSize?: number;
};

type TPaginationResponse<T> = {
  nextPage: number | null;
  total: number;
  items: T[];
};

type TBaseService<T> = {
  getAll: (params?: TPrismaDelegateParams<T>) => Promise<T[]>;
  pagination: (
    params?: TPaginationParams<T>,
  ) => Promise<TPaginationResponse<T>>;
  findFirst: (params?: TPrismaDelegateParams<T>) => Promise<T | null>;
  create: (data: TPrismaCreateData<T>) => Promise<void>;
  update: (id: number, data: TPrismaUpdateData) => Promise<void>;
  remove: (id: number) => Promise<void>;
};
