import { BrowserRouter, Route } from 'react-router-dom';

import { AppRoute } from '../../const';
import CartScreen from '../cart-screen/cart-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductScreen from '../product-screen/product-screen';
import ServerUnavailable from '../server-unavailable/server-unavailable';

function App(): JSX.Element {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route exact path={AppRoute.Main}>
        <MainScreen />
      </Route>
      <Route path={AppRoute.Catalog}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.NotFound}>
        <NotFoundScreen />
      </Route>
      <Route exact path={AppRoute.Product}>
        <ProductScreen />
      </Route>
      <Route path={AppRoute.Cart}>
        <CartScreen />
      </Route>
      <Route exact path={AppRoute.ServerUnavailable}>
        <ServerUnavailable />
      </Route>
    </BrowserRouter>
  );
}

export default App;
