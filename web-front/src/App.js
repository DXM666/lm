import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import { history } from "./common/history";
import { routes } from "./routes";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {routes.map(route => (
            <Route
              exact={true}
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;
