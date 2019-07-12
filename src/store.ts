import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducerProducts, reducerProductInCart, reducerProductFullInfo } from './reducer';
import rootSaga from './sagas';
import { Product } from './interfaces/screen.interface';

type Voter = {
  _id: string,
  vote: string,
  voter: string
}
type Comment = {
  _id: string,
  author: string,
  body: string
}

export type StoreProducts = {
  loading: boolean,
  error: boolean,
  data: Product[],
  page: number
};

export type StoreUserProducts = {
  data: Product[],
  fetchUserProducts: boolean,
  error: boolean,
};
export type StoreProductFullInfo = {
  loading: boolean,
  error: boolean,
  info: {
    name: string,
    icon: string,
    description: string,
    rating: string,
    listVoters: Voter[],
    comments: Comment[]
  }
};

export type Store = {
  products: StoreProducts;
  userProducts: StoreUserProducts;
  productFullInfo: StoreProductFullInfo;
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<{}>(
  {
    userProducts: reducerProductInCart,
    products: reducerProducts,
    productFullInfo: reducerProductFullInfo
  }
);

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;