// Backbone/Books/js/collections/library.js

var app = app || {};

app.Library = Backbone.collection.extend({
    model: app.Book
});