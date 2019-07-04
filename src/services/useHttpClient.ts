import * as React from 'react';
import { HttpClientStateContext, HttpClientDispatch } from './HttpClientProvider';
import { addLastFunction, fetchProducts, addProducts } from './HttpClientProvider';

export function useHttpClient() {
  const state = React.useContext(HttpClientStateContext);
  const dispatch = React.useContext(HttpClientDispatch);
  const getProductsInShop = async (page: number) => {
    try {
      dispatch(addLastFunction("getProductsInShop", page));
      dispatch(fetchProducts());
      const response = await fetch(`http://10.27.11.60:3001/products?page=${page}`);
      const { docs, nextPage } = await response.json();
      dispatch(addProducts(docs, nextPage));
      return { docs, nextPage };
    } catch (err) {
      throw (err);
    }
  };
  return {
    state,
    dispatch,
    getProductsInShop
  }
}