/* 
 * Copyright 2017 sesquipedalian.dev@gmail.com, All Rights Reserved.
 */
"use strict";
import React from 'react';
import { Link } from 'react-router';

export default class SubPage extends React.Component { 
   render() { 
      return (
         <div>
            <h1>Sub page!?!?</h1>
            <Link to="/">Back to the index</Link>
         </div>
      );
   }
}

