import { Route, Switch } from 'react-router-dom';

import { AppRoute } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductScreen from '../product-screen/product-screen';
import { getLoadedDataStatus } from '../../store/guitar-data/selectors';
import { useSelector } from 'react-redux';

function App(): JSX.Element {
  const isDataLoaded = useSelector(getLoadedDataStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

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
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
