// Module dependencies

var application_root = __dirname,
    express = require('express'),        // node.js middleware framework
    bodyParser = require('body-parser'), // Parser for reading request body
    path = require( 'path'),             // Utilities for dealing with file paths
    mongoose = require ('mongoose');     // MongoDB integration


// Create the server
var app = express();


// Connect to MongoDB database
mongoose.connect( 'mongodb://localhost/library_database' );

// Schemas
var Keywords = new mongoose.Schema({
    keyword: String
});

var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [ Keywords ]
});

// Models
var BookModel = mongoose.model( 'Book', Book);


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


// POST - Insert a new book.
app.post( '/api/books', function( request, response ) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate,
        keywords: request.body.keywords
    });

    book.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( book );
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


// GET - Fetch a single book by id

app.get( '/api/books/:id' , function( request, response ) {
    return BookModel.findById( request.params.id, function( err, book ) {
        if (!err) {
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});
// Test with...  NOTE: Check response text for id.
//jQuery.get( '/api/books/562963d5e016d57625000003', function( data, textStatus, jqXHR ) {
//    console.log( 'Get response:' );
//    console.dir( data );
//    console.log( textStatus );
//    console.dir( jqXHR );
//});


// PUT - Update a book - find a book by id, update its properties, save it, and send it back to the client.
app.put( '/api/books/:id', function(request, response) {
    console.log( 'Updating book ' + request.body.title );
    return BookModel.findById( request.params.id, function( err, book) {
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        book.keywords = request.body.keywords;

        return book.save( function( err ) {
            if( err ) {
                console.log( 'book updated' );
            } else {
                console.log( err );
            }
            return response.send( book );

        });
    });
});
// TEST WITH
//jQuery.ajax({
//    url: '/api/books/562963d5e016d57625000003',
//    type: 'PUT',
//    data: {
//        'title': 'JavaScript The good parts',
//        'author': 'The Legendary Douglas Crockford',
//        'releaseDate': new Date( 2008, 4, 1 ).getTime()
//    },
//    success: function( data, textStatus, jqXHR ) {
//        console.log( 'Put response:' );
//        console.dir( data );
//        console.log( textStatus );
//        console.dir( jqXHR );
//    }
//});


// DELETE a book
app.delete( '/api/books/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});
// TEST WITH
//jQuery.ajax({
//    url: '/api/books/562963d5e016d57625000003',
//    type: 'DELETE',
//    success: function( data, textStatus, jqXHR ) {
//        console.log( 'Delete response:' );
//        console.dir( data );
//        console.log( textStatus );
//        console.dir( jqXHR );
//    }
//});


// Tested updates to KEYWORDS with this code.
//jQuery.post( '/api/books', {
//    'title': 'Secrets of the JavaScript Ninja',
//    'author': 'John Resig',
//    'releaseDate': new Date( 2008, 3, 12 ).getTime(),
//    'keywords':[
//        { 'keyword': 'JavaScript' },
//        { 'keyword': 'Reference' }
//    ]
//}, function( data, textStatus, jqXHR ) {
//    console.log( 'Post response:' );
//    console.dir( data );
//    console.log( textStatus );
//    console.dir( jqXHR );
//});