/* 
 * Copyright 2017 sesquipedalian.dev@gmail.com, All Rights Reserved.
 */
"use strict";
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component { 
   render() { 
      return (
         <div className="app-container">
            <header>
               <h1> app container header </h1>
            </header>
            <div className="app-content">
               {this.props.children}
            </div>
            <footer>
               <h1> app container footer </h1>
            </footer>
         </div>
      );
   }
}

