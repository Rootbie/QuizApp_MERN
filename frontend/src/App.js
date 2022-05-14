import React from "react";
import Edit from './components/Edit/Edit';
import Add from './components/Add/Add';
import Home from "./components/Home/Home";
import { Switch, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/questions/:id" component={Edit}/> 
      </Switch>

    </div>
  );
}

export default App;