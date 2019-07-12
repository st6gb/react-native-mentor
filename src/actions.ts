import { Product } from "./interfaces/screen.interface";
import {
  ADD_INFO_PRODUCTS,
  FETCH_PRODUCT_INFORMATION,
  ADD_PRODUCT_INFORMATION_SUCCESS,
  ADD_LAST_FUNCTION,
  EXECUTE_USERS_PRODUCTS_IN_CART,
  FETCH_PRODUCTS,
  ADD_PRODUCTS,
  FETCH_PRODUCTS_FAILED,
  REQUEST_PRODUCT,
  REQUEST_PRODUCT_INFORMATION,
  FETCH_PRODUCT_INFORMATION_FAILED,
  REQUEST_ADD_PRODUCT_IN_CART,
  FETCH_USERS_PRODUCTS_IN_CART,
  ADD_USERS_PRODUCTS_IN_CART,
  FETCH_USERS_PRODUCTS_IN_CART_FAILED,
  REQUEST_GET_PRODUCTS_IN_CART,
  REQUEST_EXECUTE_PRODUCTS_IN_CART,
  REQUEST_DELETE_PRODUCT_IN_CART,
  REQUEST_VOTE_PRODUCT,
} from "./constants";


export const requestProductInformation = (id: number) => {
  return {
    type: REQUEST_PRODUCT_INFORMATION,
    payload: id
  }
}

export const fetchProductInformation = () => {
  return {
    type: FETCH_PRODUCT_INFORMATION
  };
};

export const addInfoProduct = (product: Product) => {
  return {
    type: ADD_PRODUCT_INFORMATION_SUCCESS,
    payload: product
  };
};

export const fetchInfoProductFailed = () => {
  return {
    type: FETCH_PRODUCT_INFORMATION_FAILED,
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





export const requestProduct = (page: number) => {
  return {
    type: REQUEST_PRODUCT,
    payload: page
  }
}

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

export const fetchProductsFailed = () => {
  return {
    type: FETCH_PRODUCTS_FAILED
  }
};


export const requestDeleteProductInCart = (name: string) => {
  return {
    type: REQUEST_DELETE_PRODUCT_IN_CART,
    payload: name
  }
};
export const requestExecuteProductsInCart = (tags: string[]) => {
  return {
    type: REQUEST_EXECUTE_PRODUCTS_IN_CART,
    payload: tags
  }
};
export const requestProductInCart = (name: string) => {
  return {
    type: REQUEST_ADD_PRODUCT_IN_CART,
    payload: name
  }
};
export const requestGetProductInCart = () => {
  return {
    type: REQUEST_GET_PRODUCTS_IN_CART
  }
};
export const fetchUsersProducts = () => {
  return {
    type: FETCH_USERS_PRODUCTS_IN_CART
  };
};
export const addUsersProducts = (products: Product[]) => {
  return {
    type: ADD_USERS_PRODUCTS_IN_CART,
    payload: products
  };
};
export const executeUserProducts = () => {
  return {
    type: EXECUTE_USERS_PRODUCTS_IN_CART
  };
};
export const fetchUsersProductsFailed = () => {
  return {
    type: FETCH_USERS_PRODUCTS_IN_CART_FAILED,
  };
};


export const requestVoteProduct = (name: string, rating: string) => {
  return {
    type: REQUEST_VOTE_PRODUCT,
    payload: {
      name,
      rating
    }
  }
}

export const fetchVoteInfoProduct = (product: Product) => {
  return {
    type: ADD_INFO_PRODUCTS,
    payload: product
  };
}