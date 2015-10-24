// Backbone/Books/js/collections/library.js
// Library Collection

var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books'
});

// The default implementation of Backbone.sync assumes that the API looks like this.
/*
url             HTTP Method  Operation
/api/books      GET          Get an array of all books
/api/books/:id  GET          Get the book with id of :id
/api/books      POST         Add a new book and return the book with an id attribute added
/api/books/:id  PUT          Update the book with id of :id
/api/books/:id  DELETE       Delete the book with id of :id
*/
