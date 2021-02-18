import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import "style/app.scss";

import { Join, Chat } from 'pages';
import { store } from "store";

const App: React.FC = () => (
  <Provider store={store}>
    <main className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Join} />
          <Route exact path="/chat" component={ Chat } />
        </Switch>
      </Router>
    </main>
    <div className="poweredby">
      powered by Nazarzade
    </div>
  </Provider>
);
export default App;
