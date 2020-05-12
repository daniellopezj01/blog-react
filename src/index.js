import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import './css/icons.scss';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'

/**pruebaaaaa */
import reducers from "./reducer";
const store = createStore(
  reducers,//todos los reducer
  {},//estado inicial
  applyMiddleware(reduxThunk)
  )

ReactDOM.render(
  <Provider store={ store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


