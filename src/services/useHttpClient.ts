import * as React from 'react';
import { HttpClientStateContext, HttpClientDispatch, addUsersProducts, fetchUsersProducts } from './HttpClientProvider';
import { addLastFunction, fetchProducts, addProducts } from './HttpClientProvider';
import { httpClient } from './httpClient';
import { Product } from '../interfaces/screen.interface';

export function useHttpClient() {
  const state = React.useContext(HttpClientStateContext);
  const dispatch = React.useContext(HttpClientDispatch);
  const deleteProducts = async (product: Product) => {
    try {
      dispatch(fetchUsersProducts());
      const response = await httpClient.delete("http://10.27.11.60:3001/products", product);
      dispatch(addUsersProducts(response));
      return response;
    } catch (err) {
      return err;
    }

  }

  const getProductsInShop = async (page: number) => {
    try {
      if (!page) return;
      dispatch(fetchProducts());
      const response = await fetch(`http://10.27.11.60:3001/products?page=${page}`);
      const { docs, nextPage } = await response.json();
      dispatch(addProducts(docs, nextPage));
    } catch (err) {
      throw (err);
    }
  };
  const getUsersProducts = async () => {
    try {
      dispatch(fetchUsersProducts());
      const response = await httpClient.get("http://10.27.11.60:3001/userProduct");
      dispatch(addUsersProducts(response));
    } catch (err) {
      throw (err);
    }
  };
  return {
    state,
    dispatch,
    getProductsInShop,
    getUsersProducts,
    deleteProducts
  }
}