import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {App, HomePage, HeroDetailPage} from './containers/';
// import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>    
    <Route path="about" component={AboutPage}/>
    <Route path="details/:id" component={HeroDetailPage} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
