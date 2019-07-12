import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import {
  REQUEST_PRODUCT,
  REQUEST_PRODUCT_INFORMATION,
  REQUEST_ADD_PRODUCT_IN_CART,
  REQUEST_GET_PRODUCTS_IN_CART,
  REQUEST_EXECUTE_PRODUCTS_IN_CART,
  REQUEST_DELETE_PRODUCT_IN_CART,
  REQUEST_VOTE_PRODUCT
} from './constants';
import {
  fetchProducts,
  addProducts,
  fetchProductsFailed,
  fetchProductInformation,
  addInfoProduct,
  fetchInfoProductFailed,
  fetchUsersProducts,
  addUsersProducts,
  fetchUsersProductsFailed,
  fetchVoteInfoProduct,
} from './actions';
import { httpClient } from './services/httpClient';
import { notification } from './utils/notification';

function* watchFetchProducts() {
  yield takeLatest(REQUEST_PRODUCT, workerFetchProducts);
}

function* workerFetchProducts({ payload }: { payload: number, type: "REQUEST_PRODUCT" }) {
  try {
    yield put(fetchProducts());
    const { docs, nextPage } = yield call(() => {
      return httpClient.get(`http://10.27.11.60:3001/api/products?page=${payload}`)
    });
    yield put(addProducts(docs, nextPage));
  } catch (err) {
    yield put(fetchProductsFailed());
  }
}


function* watchFetchProductInformation() {
  yield takeLatest(REQUEST_PRODUCT_INFORMATION, workerFetchProductInformation)
}

function* workerFetchProductInformation({ payload }: { payload: number, type: "REQUEST_PRODUCT_INFORMATION" }) {
  try {
    yield put(fetchProductInformation());
    const data = yield call(() => {
      return httpClient.get(`http://10.27.11.60:3001/api/products/${payload}`)
    });
    yield put(addInfoProduct(data));

  } catch (err) {
    yield put(fetchInfoProductFailed());
  }
}

function* watchAddProductInCart() {
  yield takeLatest(REQUEST_ADD_PRODUCT_IN_CART, workerAddProductInCart)
}

function* workerAddProductInCart({ payload }: { payload: string, type: "REQUEST_ADD_PRODUCT_IN_CART" }) {
  try {
    const data = yield call(() => {
      return httpClient.post('http://10.27.11.60:3001/setProduct', { name: payload });
    });
    yield put(fetchUsersProducts());
    const products = yield call(() => httpClient.get("http://10.27.11.60:3001/userProduct"));
    yield put(addUsersProducts(products));
    if (!data.ok) {
      notification("ошибка", "error");
    }
    data.nModified ?
      notification("Добавлено", "ok") :
      notification("Уже добавлено", "attention");
  } catch (err) {
    yield put(fetchUsersProductsFailed());
  }
}

function* watchFetchProductInCart() {
  yield takeLatest(REQUEST_GET_PRODUCTS_IN_CART, workerFetchProductInCart);
}

function* workerFetchProductInCart() {
  try {
    yield put(fetchUsersProducts());
    const data = yield call(() => httpClient.get("http://10.27.11.60:3001/userProduct"));
    yield put(addUsersProducts(data));
  } catch (err) {
    yield put(fetchUsersProductsFailed());
  }
}

function* watchExecuteProductInCart() {
  yield takeLatest(REQUEST_EXECUTE_PRODUCTS_IN_CART, workerExecuteProductInCart);
}

function* workerExecuteProductInCart({ payload }: { payload: string[], type: "REQUEST_EXECUTE_PRODUCTS_IN_CART" }) {
  try {
    yield put(fetchUsersProducts());
    yield call(() => httpClient.get("http://10.27.11.60:3001/executeOrder", payload));
    yield put(addUsersProducts([]));
    notification("Empty", "attention");
  } catch (err) {
    notification("ошибка", "error");
    yield put(fetchUsersProductsFailed());
  }
}

function* watchDeleteProductInCart() {
  yield takeLatest(REQUEST_DELETE_PRODUCT_IN_CART, workerDeleteProductInCart);
}

function* workerDeleteProductInCart({ payload }: { payload: string, type: 'REQUEST_DELETE_PRODUCT_IN_CART' }) {
  try {
    yield put(fetchUsersProducts());
    const data = yield call(() => httpClient.delete("http://10.27.11.60:3001/products", { name: payload }));
    yield put(addUsersProducts(data));
    notification("удалено", "ok");
  } catch (err) {
    notification("ошибка", "error");
    yield put(fetchUsersProductsFailed());
  }
}

function* watchVoteProduct() {
  yield takeLatest(REQUEST_VOTE_PRODUCT, workerVoteProduct);
}

function* workerVoteProduct(
  {
    payload:
    {
      name, rating
    }
  }:
    {
      type: 'REQUEST_VOTE_PRODUCT',
      payload:
      {
        name: string,
        rating: string
      }
    }
) {
  try {
    yield put(fetchUsersProducts());
    const data = yield call(() => httpClient.post(`http://10.27.11.60:3001/api/vote`, { name, rating }))
    yield put(fetchVoteInfoProduct(data));
  } catch (err) {
    yield put(fetchProductsFailed());
  }
}

function* rootSaga() {
  yield fork(watchAddProductInCart);
  yield fork(watchFetchProducts);
  yield fork(watchFetchProductInformation);
  yield fork(watchFetchProductInCart);
  yield fork(watchExecuteProductInCart);
  yield fork(watchDeleteProductInCart);
  yield fork(watchVoteProduct);
}
export default rootSaga;
