import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';

import { AppRoute } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductScreen from '../product-screen/product-screen';
import { State } from '../../types/state';
import browserHistory from '../../browser-history';
import { getLoadedDataStatus } from '../../store/guitar-data/selectors';

const mapStateToProps = (state: State) => ({
  isDataLoaded: getLoadedDataStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {isDataLoaded} = props;

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Main}>
          <MainScreen />
        </Route>
        <Route path={AppRoute.FilterPrefix}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.Product}>
          <ProductScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
