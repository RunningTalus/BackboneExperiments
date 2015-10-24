// Backbone/Books/js/app.js

var app = app || {};

$(function() {
    $( '#releaseDate' ).datepicker();
    new app.LibraryView();
});