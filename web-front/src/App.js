import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import { Provider } from "mobx-react";
import { history } from "./common/history";
import { routes } from "./routes";
import { store } from "../src/pages/store/index";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {routes.map(route => (
              <Route
                exact={true}
                key={route.path}
                path={route.path}
                render={props => (
                  <route.component
                    {...props}
                    routes={route.routes}
                    isShowSideMenu={route.isShowSideMenu}
                  />
                )}
              />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
