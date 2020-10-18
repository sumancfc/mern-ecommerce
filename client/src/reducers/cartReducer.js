import {
  ADD_TO_CART_ITEM,
  PAYMENT_METHOD_TO_CART,
  REMOVE_TO_CART_ITEM,
  SHIPPING_ADDRESS_TO_CART,
} from "../constant/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_ITEM:
      const item = action.payload;

      const itemExists = state.cartItems.find(
        (x) => x.product === item.product
      );

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === itemExists.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_TO_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case SHIPPING_ADDRESS_TO_CART:
      return { ...state, shippingAddress: action.payload };

    case PAYMENT_METHOD_TO_CART:
      return { ...state, paymentMethod: action.payload };

    default:
      return state;
  }
};
