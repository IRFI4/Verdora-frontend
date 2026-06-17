export type Category = {
  categoryId: number;
  name: string;
};

export type CreateCategoryPayload = {
  name: string;
};

export type UpdateCategoryPayload = {
  categoryId: number;
  name: string;
};

export type DeleteCategoryPayload = {
  categoryId: number;
};

export type GetCategoryByIdPayload = {
  categoryId: number;
};
