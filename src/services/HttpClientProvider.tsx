import * as React from "react";
import { Product } from "../interfaces/screen.interface";
const initialState = {
  lastFunction: "",
  lastArguments: null,
  products: {
    loading: false,
    data: [],
    page: 1
  }
};
export const HttpClientStateContext = React.createContext(initialState);
export const HttpClientDispatch = React.createContext<React.Dispatch<Argument>>(
  () => {}
);

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

export const addLastFunction = (lastFunction: string, lastArguments: any) => {
  return {
    type: ADD_LAST_FUNCTION,
    payload: {
      lastFunction,
      lastArguments
    }
  };
};

export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS
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

const reducer = (state: State, { type, payload }: Argument) => {
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
