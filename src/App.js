import "./App.css";
import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppNavbar from "./components/AppNavBar";
import Routes from "./Routes";
//Redux
import { Provider } from "react-redux";
import store from "./flux/store";
import { getLots } from "./flux/actions/lotActions";
import { getCombinations } from "./flux/actions/combinationAction";
import { getHomePlans } from "./flux/actions/homeplanActions";

function App() {
  useEffect(() => {
    store.dispatch(getLots());
    store.dispatch(getCombinations());
    store.dispatch(getHomePlans());
  }, []);

  return (
    <Provider store={store}>
      <AppNavbar />
      <Switch>
        {Routes.map((route) => (
          <Route exact path={route.path} key={route.path}>
            <route.component />
          </Route>
        ))}
        <Route render={() => <Redirect to={{ pathname: "/homes" }} />} />
      </Switch>
    </Provider>
  );
}

export default App;
