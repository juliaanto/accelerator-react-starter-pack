import { Route, Switch } from 'react-router-dom';

import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductScreen from '../product-screen/product-screen';
import ServerUnavailable from '../server-unavailable/server-unavailable';

function App(): JSX.Element {

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreen />
      </Route>
      <Route path={AppRoute.Catalog}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.Product}>
        <ProductScreen />
      </Route>
      <Route exact path={AppRoute.ServerUnavailable}>
        <ServerUnavailable />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
