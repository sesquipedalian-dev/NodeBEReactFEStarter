/* 
 * Copyright 2017 sesquipedalian.dev@gmail.com, All Rights Reserved.
 */
"use strict";
import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

export default class AppRoutes extends React.Component { 
   render() { 
      console.log("started AppRoutes");
      return (
         <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>      
      );
   }
}

