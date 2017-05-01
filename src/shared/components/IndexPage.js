/* 
 * Copyright 2017 sesquipedalian.dev@gmail.com, All Rights Reserved.
 */
"use strict";
import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component { 
   render() { 
      return (
         <div>
            <h1>IndexPage</h1>
            <Link key={'sub'} to={'sub'}>
               Go To Sub page
            </Link>;
         </div>
      );
   }
}

