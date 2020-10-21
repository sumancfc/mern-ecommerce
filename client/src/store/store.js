import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewReducer,
  productUpdateReducer,
} from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "../reducers/userReducer";
import {
  myOrderReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "../reducers/orderReducer";

const reducers = combineReducers({
  productListR: productListReducer,
  productDetailsR: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReview: productReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrder: myOrderReducer,
  orderList: orderListReducer,
});

const getItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const getUserFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const getShipingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: getItemsFromStorage,
    shippingAddress: getShipingAddressFromStorage,
  },
  userLogin: { userInfo: getUserFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
