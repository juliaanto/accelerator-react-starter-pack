import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
