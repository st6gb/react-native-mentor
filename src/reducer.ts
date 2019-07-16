import { Product } from "./interfaces/screen.interface";
import {
  FETCH_PRODUCTS,
  ADD_PRODUCTS,
  FETCH_USERS_PRODUCTS_IN_CART,
  ADD_USERS_PRODUCTS_IN_CART,
  ADD_INFO_PRODUCTS,
  EXECUTE_USERS_PRODUCTS_IN_CART,
  FETCH_PRODUCT_INFORMATION,
  ADD_PRODUCT_INFORMATION_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCT_INFORMATION_FAILED,
} from "./constants";
import { StoreProducts, StoreUserProducts, StoreProductFullInfo } from "./store";

const initialUserProducts = {
  data: [],
  fetchUserProducts: false,
  error: false,
}

export const reducerProductInCart = (
  state: StoreUserProducts = initialUserProducts,
  { type, payload }: { type: string; payload?: any }
) => {
  switch (type) {
    case FETCH_USERS_PRODUCTS_IN_CART:
      return {
        ...state,
        fetchUserProducts: true
      };
    case ADD_USERS_PRODUCTS_IN_CART:
      return {
        data: payload,
        fetchUserProducts: false
      };
    case EXECUTE_USERS_PRODUCTS_IN_CART:
      return {
        data: [],
        fetchUserProducts: false
      };
    default:
      return state;
  }
};

const initialProducts = {
  loading: false,
  error: false,
  data: [],
  page: 1,
  crazy: 'lala',
};

export const reducerProducts = (
  state: StoreProducts = initialProducts,
  { type, payload }: { type: string, payload: any }
) => {
  switch (type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        loading: true

      };
    }
    case ADD_PRODUCTS:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...payload.products],
        page: payload.page
      };
    case FETCH_PRODUCTS_FAILED: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case ADD_INFO_PRODUCTS:
      return {
        ...state,
        data: state.data.map((product: Product) => {
          if (product._id === payload._id) {
            return payload;
          }
          return product;
        })
      };
    default:
      return state;
  }
}

const initialProductFullInfo: StoreProductFullInfo = {
  loading: false,
  error: false,
  info: {
    name: "",
    icon: "",
    description: "",
    rating: "",
    listVoters: [],
    comments: []
  }
}

export const reducerProductFullInfo = (
  state: StoreProductFullInfo = initialProductFullInfo,
  { type, payload }: { type: string, payload: any }
) => {
  switch (type) {
    case FETCH_PRODUCT_INFORMATION:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_PRODUCT_INFORMATION_SUCCESS:
      return {
        ...state,
        info: payload,
        loading: false
      };
    case FETCH_PRODUCT_INFORMATION_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}