export type Product = {
  productId: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  discountPrice?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateProductPayload = {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  discountPrice?: number;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;

export type GetProductsPayload = {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  discount?: boolean;
  search?: string;
  page?: number;
  size?: number;
  sort?: string | string[];
};
