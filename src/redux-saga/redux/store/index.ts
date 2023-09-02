import {
  applyMiddleware,
  legacy_createStore as createStore,
  Store,
  compose,
} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "redux-saga";
import rootSaga from "../../sagas";
import rootReducer from "../reducers";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;
export const store: Store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
