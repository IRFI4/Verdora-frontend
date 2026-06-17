export type AddItemToCartPayload = {
  productId: number;
  quantity: number;
};

export type RemoveItemFromCartPayload = {
  cartItemId: number;
};

export type UpdateCartItemQuantityPayload = {
  cartItemId: number;
  quantity: number;
};

export type CartItemType = {
  cartItemId: number;
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  subtotal: number;
};

export type CartType = {
  cartId: number;
  items: CartItemType[];
  totalPrice: number;
  shippingCost: number;
};
