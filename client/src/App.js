import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage"
import "./styles.scss";

function App() {
  return (
      <div className="App">
        
        <Switch>
        <PrivateRoute exact path="/BubblePage" component={BubblePage}></PrivateRoute>

        <Route exact path="/" component={Login} />
        </Switch>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
  );
}

export default App;
