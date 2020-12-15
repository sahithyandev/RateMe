import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { CreateBoardPage, BoardPage, FeedbacksPage } from "./pages/index";
import "./style/import.ant.less";
import "./style/main.scss";

export const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route path="/create">
            <CreateBoardPage />
          </Route>
          <Route path="/board/:id/feedbacks">
            <FeedbacksPage />
          </Route>
          <Route path="/board/:id">
            <BoardPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));
