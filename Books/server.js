// Module dependencies

var application_root = __dirname,
    express = require('express'),        // node.js middleware framework
    bodyParser = require('body-parser'), // Parser for reading request body
    path = require( 'path'),             // Utilities for dealing with file paths
    mongoose = require ('mongoose');     // MongoDB integration

// Create the server
var app = express();

// Configure the server
app.configure( function() {

    // Parses the request body and populates request.body
    app.use( express.bodyParser() );

    // Checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    // Perform route lookup based on URL and HTTP method
    app.use( app.router );

    // Where to serve static content
    app.use( express.static( path.join( application_root, '' ) ) );

    // Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

});

// Start the server.
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in the %s mode', port, app.settings.env );
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'The Library API is running' );
});

