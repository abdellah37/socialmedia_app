import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose } from 'redux';
import thunk from 'redux-thunk';
import  reducers  from './reducers'
import './index.css';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './App';

const composeEnhancers = composeWithDevTools({

    trace: true,
    traceLimit: 25,
  })

const store = createStore(reducers , composeEnhancers(applyMiddleware(thunk)) );

ReactDOM.render(<Provider store={store}>
<App />
</Provider>, document.getElementById('root'));