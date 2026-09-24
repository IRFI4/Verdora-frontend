import type { Cart, CartItemType } from '@/types/cart';
import type { Product } from '@/types/product';
import { productService } from '@api/product/product.service';
import { cartService } from '@api/cart/cart.service';

const GUEST_CART_STORAGE_KEY = 'verdora_guest_cart';

export const getGuestCart = (): Cart => {
  if (typeof window === 'undefined') {
    return { cartId: 0, items: [], totalPrice: 0, shippingCost: 0 };
  }

  try {
    const raw = localStorage.getItem(GUEST_CART_STORAGE_KEY);
    if (!raw) {
      return { cartId: 0, items: [], totalPrice: 0, shippingCost: 0 };
    }

    const parsed = JSON.parse(raw) as Partial<Cart>;
    const items = (parsed.items || []).map(item => {
      const price = item.price ?? 0;
      const unitPrice =
        item.discountPrice !== undefined ? item.discountPrice : price;
      const quantity = Math.max(1, item.quantity ?? 1);
      return {
        ...item,
        price,
        quantity,
        subtotal: unitPrice * quantity,
      } as CartItemType;
    });

    const shippingCost = parsed.shippingCost ?? 0;
    const totalPrice =
      items.reduce((sum, i) => sum + i.subtotal, 0) + shippingCost;

    return {
      cartId: 0,
      items,
      totalPrice,
      shippingCost,
    };
  } catch {
    return { cartId: 0, items: [], totalPrice: 0, shippingCost: 0 };
  }
};

export const saveGuestCart = (cart: Cart): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    return;
  }
};

export const addGuestCartItem = async (payload: {
  productId: number;
  quantity: number;
  product?: Partial<Product>;
}): Promise<Cart> => {
  const cart = getGuestCart();
  const existingItemIndex = cart.items.findIndex(
    item => item.productId === payload.productId
  );

  if (existingItemIndex > -1) {
    const existing = cart.items[existingItemIndex];
    const newQty = existing.quantity + payload.quantity;
    const unitPrice =
      existing.discountPrice !== undefined
        ? existing.discountPrice
        : existing.price;
    cart.items[existingItemIndex] = {
      ...existing,
      quantity: newQty,
      subtotal: unitPrice * newQty,
    };
  } else {
    let product = payload.product;
    if (!product || !product.name || product.price === undefined) {
      try {
        product = await productService.getProductById(payload.productId);
      } catch {
        return cart;
      }
    }

    const price = product?.price ?? 0;
    const discountPrice =
      product?.discountPrice && product.discountPrice < price
        ? product.discountPrice
        : undefined;
    const unitPrice = discountPrice !== undefined ? discountPrice : price;
    const quantity = Math.max(1, payload.quantity);

    const newItem: CartItemType = {
      cartItemId: Date.now() + Math.floor(Math.random() * 1000),
      productId: payload.productId,
      productName: product?.name ?? `Product #${payload.productId}`,
      imageUrl: product?.imageUrl ?? '',
      price,
      discountPrice,
      quantity,
      subtotal: unitPrice * quantity,
    };

    cart.items.push(newItem);
  }

  const shippingCost = cart.shippingCost ?? 0;
  cart.totalPrice =
    cart.items.reduce((sum, item) => sum + item.subtotal, 0) + shippingCost;

  saveGuestCart(cart);
  return cart;
};

export const updateGuestCartItemQuantity = (
  cartItemId: number,
  quantity: number
): Cart => {
  const cart = getGuestCart();
  const index = cart.items.findIndex(item => item.cartItemId === cartItemId);
  if (index > -1) {
    const item = cart.items[index];
    const newQty = Math.max(1, quantity);
    const unitPrice =
      item.discountPrice !== undefined ? item.discountPrice : item.price;
    cart.items[index] = {
      ...item,
      quantity: newQty,
      subtotal: unitPrice * newQty,
    };
  }

  const shippingCost = cart.shippingCost ?? 0;
  cart.totalPrice =
    cart.items.reduce((sum, item) => sum + item.subtotal, 0) + shippingCost;

  saveGuestCart(cart);
  return cart;
};

export const removeGuestCartItem = (cartItemId: number): Cart => {
  const cart = getGuestCart();
  cart.items = cart.items.filter(item => item.cartItemId !== cartItemId);

  const shippingCost = cart.shippingCost ?? 0;
  cart.totalPrice =
    cart.items.reduce((sum, item) => sum + item.subtotal, 0) + shippingCost;

  saveGuestCart(cart);
  return cart;
};

export const clearGuestCart = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(GUEST_CART_STORAGE_KEY);
  } catch {
    return;
  }
};

export const syncGuestCartToBackend = async (): Promise<void> => {
  const guestCart = getGuestCart();
  if (!guestCart.items || guestCart.items.length === 0) return;

  for (const item of guestCart.items) {
    try {
      await cartService.addItemToCart({
        productId: item.productId,
        quantity: item.quantity,
      });
    } catch {
      continue;
    }
  }

  clearGuestCart();
};
