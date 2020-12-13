import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateBoardPage from "./pages/CreateBoard";
import "./style/main.scss";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create">
          <CreateBoardPage />
        </Route>
        <Route path="/board/:id"></Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));
