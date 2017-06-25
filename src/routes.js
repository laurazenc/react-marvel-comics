import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {App, Home, CharacterDetail, Favorites} from './containers/';
import {NotFound} from './components/';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/details/:id" component={CharacterDetail} />
    <Route path="/favorites" component={Favorites} />
    <Route path="*" component={NotFound}/>
  </Route>
);
