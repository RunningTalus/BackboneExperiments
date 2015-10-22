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

// Get a list of all books
app.get( '/api/books', function( request, response ) {
    return BookModel.find( function( err, books ) {
        if( !err ) {
            return response.send( books );
        } else {
            return console.log( err );
        }
    });
});

// Restart the server and enter this into DevTools console to test GET request.
//jQuery.get( '/api/books/', function( data, textStatus, jqXHR ) {
//    console.log( 'Get response:' );
//    console.dir( data );
//    console.log( textStatus );
//    console.dir( jqXHR );
//});

// RETURNS: an empty array, because we have not added and items to MongoDB.


// Insert a new book.
app.post( '/api/books', function( request, response ) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate
    });

    return book.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( book );
        } else {
            console.log( err );
        }
    });
});
// Restart the server and enter this into DevTools console to test POST request.
//jQuery.post( '/api/books', {
//    'title': 'JavaScript the good parts',
//    'author': 'Douglas Crockford',
//    'releaseDate': new Date( 2008, 4, 1 ).getTime()
//}, function(data, textStatus, jqXHR) {
//    console.log( 'Post response:' );
//    console.dir( data );
//    console.log( textStatus );
//    console.dir( jqXHR );
//});

// Then enter this.
//jQuery.get( '/api/books/', function( data, textStatus, jqXHR ) {
//    console.log( 'Get response:' );
//    console.dir( data );
//    console.log( textStatus );
//    console.dir( jqXHR );
//});


// Connect to MongoDB database
mongoose.connect( 'mongodb://localhost/library_database' );


// Schemas
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});


// Models
var BookModel = mongoose.model( 'Book', Book);






