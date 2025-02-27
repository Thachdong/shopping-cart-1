type TUser = {
  id: number;
  createdAt: string;
  username: string;
  phoneNumber: string;
  roles: string[];
  email?: string;
  birthday?: string;
  address?: string;
};

type TUsersTableProps = {
  users: TUser[];
};

type TCreateUser = {
  username: string;
  phoneNumber: string;
  // address fields
  homeNumber: string;
  ward: string;
  city: string;
  avatarId?: number;
  email?: string;
  birthday?: string;
};

type TUserOrder = {
  id: number;
  createdAt: string;
  completeDate: string;
  items: string[];
  total: number;
};

type TUserDetail = Omit<TUser, "address"> & {
  addresses: string[];
  orders: TUserOrder[];
};

type TLoginCredentials = {
  username: string;
  password: string;
};
