import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Pokedex from './components/pokedex/pokedex';
import PokemonDetails from './components/pokemon-details-component/pokemon';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/pokemon-details/:id" component={PokemonDetails}></Route>
        <Route path="/" component={Pokedex}></Route>
        <Pokedex/>
      </Switch>
    </Router>      
  );
}

export default App;
