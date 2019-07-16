import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducerProducts, reducerProductInCart, reducerProductFullInfo } from './reducer';
import rootSaga from './sagas';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { Product } from './interfaces/screen.interface';
import AsyncStorage from '@react-native-community/async-storage';
import MigrationManifest from 'redux-persist/es/types';

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
  page: number,
  crazy: string,
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

interface MigrationManifest {
  [key: number]: (state: Store) => Store
}

const migrations: MigrationManifest = {
  2: (state: Store) => {
    return {
      ...state,
      products: {
        ...state.products,
        crazy: 'lolala2',
      }
    }
  },
  1: (state: Store) => {
    return {
      ...state,
      products: {
        ...state.products,
        crazy: 'lolala',
      }
    }
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 2,
  migrate: createMigrate(migrations, { debug: false }),
};


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<{}>(
  {
    userProducts: reducerProductInCart,
    products: reducerProducts,
    productFullInfo: reducerProductFullInfo
  }
);

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };