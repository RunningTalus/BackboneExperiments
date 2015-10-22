// Backbone/Books/js/collections/library.js

var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book
});