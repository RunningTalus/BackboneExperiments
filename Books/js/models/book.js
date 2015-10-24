// Books/js/models/book.js
// BookModel

var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage: 'img/placeholder.jpg',
        title: 'No title',
        author: 'Unknown',
        releaseDate: 'Unknown',
        keywords: 'None'
    },

    idAttribute: '_id'

/*    parse: function( response ) {
        response.id = response._id;
        return response;
    }*/

});