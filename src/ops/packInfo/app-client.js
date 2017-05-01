/* 
 * Copyright 2017 sesquipedalian.dev@gmail.com, All Rights Reserved.
 */
"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from '../../shared//components/AppRoutes';

window.onload = () => {
   console.log("loaded packed bundle");
   ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
