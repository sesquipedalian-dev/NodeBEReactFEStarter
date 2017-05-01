/* 
 * Copyright 2017 sesquipedalian.dev@gmail.com, All Rights Reserved.
 */
"use strict";

// set up global variables for the express router and the http server
// that will serve those routes
import Express from 'express';
const app = new Express();

import { Server } from 'http';
const server = new Server(app); 

// have express statically serve files routes under /src/public as /
import path from 'path';
const pathToStatic = path.join(__dirname, '..', 'public');
const indexHtmlFilename = path.join(pathToStatic, 'index.html');
app.use(Express.static(pathToStatic)); 

// populate request.body for POST endpoints
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: true})); 

// do server-side rendering for end points that are parts of the routes.js
// we are using for the client side rendering
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../shared/routes';

// initialize index file so that we'll have it for rendering server-side react
let indexTemplateBeforePart = '';
let indexTemplateAfterPart = '';
const markupLocInIndex = '<div id="main">';
import fs from 'fs';
fs.open(indexHtmlFilename, 'r', (err, fd) => {
   // if file not found, then send a 404
   if (err) {
      if (err.code === 'ENOENT') {
         let error = `index.html file couldn't be found at ${indexHtmlFilename}!`;
         // kill process
         throw error;
      } else { 
         throw err;
      }
   }

   // if index file found, read it in to populate the index template 
   // used for rendering react routes on server-side
   fs.fstat(fd, function (err, stats) {
      // suck the index HTML file contents into memory
      var bufferSize = stats.size,
         chunkSize = 512,
         buffer = new Buffer(bufferSize),
         bytesRead = 0;

      while (bytesRead < bufferSize) {
         if ((bytesRead + chunkSize) > bufferSize) {
            chunkSize = (bufferSize - bytesRead);
         }
         fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
         bytesRead += chunkSize;
      }
      var indexHtmlContents = buffer.toString('utf8', 0, bufferSize);
      
      // find the injection location in the index.html
      var indexOf = indexHtmlContents.indexOf(markupLocInIndex);
      if(indexOf !== -1) { 
         // set the before / after part of the template per where the markup injection was found
         indexTemplateBeforePart = indexHtmlContents.substring(0, indexOf) + markupLocInIndex;
         indexTemplateAfterPart = indexHtmlContents.substring(indexOf + markupLocInIndex.length);
      }
      
      fs.close(fd);
   });
});

import NotFoundPage from '../shared/components/NotFoundPage';
app.get('*', (req, res) => { 
   match(
      {routes, location: req.url }, 
      (err, redirectLocation, renderProps) => {
         console.log(`handling request for route ${req.url}`);
         // handle generic error
         if(err) { 
            return res.status(500).send(err.message);
         }
         
         // handle if a route tells us to redirect browser
         if(redirectLocation) { 
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
         }
         
         // Generate react markup / contents for current route
         let markup;
         if(renderProps) { 
            // if route matched we have renderProps
            markup = renderToString(<RouterContext {...renderProps}/>);
         } else { 
            // otherwise we can use the 404 page
            markup = renderToString(<NotFoundPage/>);
            res.status(404);
         }
         
         // return the rendered markup, inserted into the index
         return res.status(200).send(`${indexTemplateBeforePart}${markup}${indexTemplateAfterPart}`);
      }
   );
});

// set up database connection
import { MongoClient, ObjectId } from 'mongodb';
import { mongoUser, mongoPass, mongoUrlPart } from './config';
const mongoURL = `mongodb://${mongoUser}:${mongoPass}@${mongoUrlPart}`;
let mongoDb;

// connect to mongo DB, and then start the server listening if that was successful
MongoClient.connect(mongoURL, (err, database) => { 
   if (err) return console.log(err);
   
   mongoDb = database;
   
   server.listen(80, err => { 
      if(err) { 
         return console.error(err);
      }
      console.info(`Server running on http://localhost:80`);
   });
});
