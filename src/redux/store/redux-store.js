import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";

import productsReducer from "../reducers/products-reducer";
import catalogReducer from "../reducers/catalog-reducer";
import collectionsReducer from "../reducers/collections-reducer";
import authorizationReducer from "../reducers/authorization-reducer";
import mobileMenuReducer from "../reducers/mobMenu-reducer";
import modalWindowReducer from "../reducers/modalWindow-reducer";
import newsReducer from "../reducers/news-reducer";
import cartsReducer from "../reducers/cart-reducer";
import filtersReducer from "../reducers/filters-reducer";
import sharesReducer from "../reducers/shares-reducer";
import fetchViewedProductsReducer from "../reducers/fetchViewedProducts-reducer";
import tabsReducer from "../reducers/tabs-reducer";
import mergeCartsReducer from "../reducers/mergeCarts-reducer";
import loadingReducer from "../reducers/loading-reducer";
import orderReducer from "../reducers/order-reducer";
import orderAdminReducer from "../reducers/orderAdmin-reducer";
import submitFormReducer from "../reducers/submitForm-reducer";
import excursionsReducer from "../reducers/excursions-reducer";

const rootReducer = combineReducers({
  fetchViewedProducts: fetchViewedProductsReducer,
  products: productsReducer,
  catalog: catalogReducer,
  collections: collectionsReducer,
  user: authorizationReducer,
  mobileMenu: mobileMenuReducer,
  carts: cartsReducer,
  filters: filtersReducer,
  modal: modalWindowReducer,
  news: newsReducer,
  tabs: tabsReducer,
  mergeCart: mergeCartsReducer,
  shares: sharesReducer,
  loader: loadingReducer,
  order: orderReducer,
  orderAdmin: orderAdminReducer,
  formSubmit: submitFormReducer,
  excursions: excursionsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
  whitelist: ["carts", "order", "user", "tabs", "mergeCart", "orderAdmin"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export { store, persistor };
