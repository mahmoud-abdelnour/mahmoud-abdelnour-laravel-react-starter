import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';
import { applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import App from './App';
import reducers from './store/reducers/index'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
)

let persistor = persistStore(store)
  



let container = null;
document.addEventListener('DOMContentLoaded', function(event) {
    if (!container) {
        container = document.getElementById('root') ;
        const root = ReactDOM.createRoot(container)
        root.render(
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <HashRouter>
                        <App />
                    </HashRouter>
                </PersistGate>
            </Provider>
        );
    }
});
    


