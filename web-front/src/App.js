import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import { HomePageAction } from "./action/homepageaction";
import { Provider } from "mobx-react";
import { Store } from "./store/store";
import { history } from "./common/history";
import { routes } from "./routes";

// ③实例化单一数据源
const store = new Store();
// ④实例化 actions，并且和 store 进行关联
const actions = new HomePageAction(store);

class App extends Component {
  render() {
    return (
      <Provider store={store} actions={actions}>
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
