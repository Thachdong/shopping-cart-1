type TUser = {
  id: number;
  createdAt: string;
  username: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  address: string;
};

type TUsersTableProps = {
  users: TUser[];
};
