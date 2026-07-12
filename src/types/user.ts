export type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export type UpdateUserPayload = {
  name?: string;
  phone?: string;
};

export type GetAllUsersPayload = {
  page: number;
  size: number;
  sort?: string[];
};
