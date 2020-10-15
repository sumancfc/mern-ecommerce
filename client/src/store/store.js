import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import { userLoginReducer, userRegisterReducer } from "../reducers/userReducer";

const reducers = combineReducers({
  productListR: productListReducer,
  productDetailsR: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const getItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const getUserFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: getItemsFromStorage,
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
