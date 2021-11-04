import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose } from 'redux';
import thunk from 'redux-thunk';
import  reducers  from './reducers'
import './index.css';
import {composeWithDevTools} from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const composeEnhancers = composeWithDevTools({

    trace: true,
    traceLimit: 25,
  })

  const persistConfig = {
    key: 'root',
    storage,
  } 
  const persistedReducer = persistReducer(persistConfig,reducers )  

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)) );
let persistor = persistStore(store);

ReactDOM.render(<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<App />
</PersistGate>


</Provider>, document.getElementById('root'));