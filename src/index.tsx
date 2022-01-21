import { fetchCommentsAction, fetchGuitarsAction } from './store/api-actions';

import App from './components/app/app';
import { Router as BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import api from './services/api';
import browserHistory from './browser-history';
import { configureStore } from '@reduxjs/toolkit';
import { redirect } from './store/middlewares/redirect';
import { rootReducer } from './store/root-reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(fetchGuitarsAction());
store.dispatch(fetchCommentsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
