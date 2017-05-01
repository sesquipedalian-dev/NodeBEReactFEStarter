/* 
 * Copyright 2017 sesquipedalian.dev@gmail.com, All Rights Reserved.
 */
"use strict"; 
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import SubPage from './components/SubPage';

const routes = (
   <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route path="sub" component={SubPage}/>
      <Route path="*" component={NotFoundPage}/>
   </Route>
);

export default routes;
