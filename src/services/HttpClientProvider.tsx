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
    case CLEAR_USERS_PRODUCTS:
      return {
        ...state,
        userProducts: {
          data: [],
          fetchUserProducts: false
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
