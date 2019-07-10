import * as React from "react";
import { Product } from "../interfaces/screen.interface";
const initialState = {
  lastFunction: "",
  lastArguments: null,
  products: {
    loading: false,
    data: [],
    page: 1
  },
  userProducts: {
    data: [],
    fetchUserProducts: false
  },
  productFullInfo: {
    loading: false,
    info: {
      name: "",
      icon: "",
      description: "",
      rating: "",
      listVoters: [],
      comments: []
    }
  }
};
export const HttpClientStateContext = React.createContext(initialState);
export const HttpClientDispatch = React.createContext<
  React.Dispatch<{ type: string; payload?: any }>
>(() => {});

type State = any;

interface Argument {
  type?: string;
  payload?: {
    lastFunction?: string;
    lastArguments?: any;
    products?: Product[];
    page?: number;
  };
}

export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const ADD_LAST_FUNCTION = "ADD_LAST_FUNCTION";
export const FETCH_USERS_PRODUCTS = "FETCH_USERS_PRODUCTS";
export const ADD_USERS_PRODUCTS = "ADD_USERS_PRODUCTS";
export const CLEAR_USERS_PRODUCTS = "CLEAR_USERS_PRODUCTS";
export const FETCH_PRODUCT_INFORMATION = "FETCH_PRODUCT_INFORMATION";
export const ADD_PRODUCT_INFORMATION = "ADD_PRODUCT_INFORMATION";
export const ADD_INFO_PRODUCTS = "ADD_INFO_USERS_PRODUCTS";

export const addInfoProducts = (product: Product) => {
  return {
    type: ADD_INFO_PRODUCTS,
    payload: product
  };
};
export const fetchInfoProduct = () => {
  return {
    type: FETCH_PRODUCT_INFORMATION
  };
};

export const addInfoProduct = (product: Product) => {
  return {
    type: ADD_PRODUCT_INFORMATION,
    payload: product
  };
};

export const addLastFunction = (lastFunction: string, lastArguments: any) => {
  return {
    type: ADD_LAST_FUNCTION,
    payload: {
      lastFunction,
      lastArguments
    }
  };
};

export const clearUserProducts = () => {
  return {
    type: CLEAR_USERS_PRODUCTS
  };
};

export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS
  };
};

export const fetchUsersProducts = () => {
  return {
    type: FETCH_USERS_PRODUCTS
  };
};

export const addUsersProducts = (products: Product[]) => {
  return {
    type: ADD_USERS_PRODUCTS,
    payload: {
      products
    }
  };
};

export const addProducts = (products: Product[], page: number) => {
  return {
    type: ADD_PRODUCTS,
    payload: {
      products,
      page
    }
  };
};

const reducer = (
  state: State,
  { type, payload }: { type: string; payload?: any }
) => {
  switch (type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: {
          ...state.products,
          loading: true
        }
      };
    }
    case ADD_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          data: [...state.products.data, ...payload.products],
          page: payload.page
        }
      };
    case ADD_LAST_FUNCTION:
      return {
        ...state,
        lastFunction: payload.lastFunction,
        lastArguments: payload.lastArguments
      };
    case FETCH_USERS_PRODUCTS:
      return {
        ...state,
        userProducts: {
          ...state.userProducts,
          fetchUserProducts: true
        }
      };
    case ADD_USERS_PRODUCTS:
      return {
        ...state,
        userProducts: {
          data: payload.products,
          fetchUserProducts: false
        }
      };
    case ADD_INFO_PRODUCTS:
      return {
        ...state,
        products: {
          data: state.products.data.map((product: Product) => {
            if (product._id === payload._id) {
              return payload;
            }
            return product;
          }),
          fetchUserProducts: false
        }
      };
    case CLEAR_USERS_PRODUCTS:
      return {
        ...state,
        userProducts: {
          data: [],
          fetchUserProducts: false
        }
      };
    case FETCH_PRODUCT_INFORMATION:
      return {
        ...state,
        productFullInfo: {
          ...state.productFullInfo,
          loading: true
        }
      };
    case ADD_PRODUCT_INFORMATION:
      return {
        ...state,
        productFullInfo: {
          info: payload,
          loading: false
        }
      };
    default:
      return state;
  }
};

export const HttpClientProvider: React.FunctionComponent<{}> = ({
  children
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <HttpClientStateContext.Provider value={state}>
      <HttpClientDispatch.Provider value={dispatch}>
        {children}
      </HttpClientDispatch.Provider>
    </HttpClientStateContext.Provider>
  );
};