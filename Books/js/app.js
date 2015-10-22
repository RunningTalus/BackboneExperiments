// Backbone/Books/js/app.js

var app = app || {};

$(function() {

    var books = [
        {title: 'Grizzly Years', author: 'Doug Peacock', releaseDate: '1990', keywords: 'Grizzly, Wilderness'},
        {title: 'Beast In The Garden', author: 'David Baron', releaseDate: '2005', keywords: 'Cougar, Mountain Lion'},
        {title: 'The Tiger', author: 'John Vaillant', releaseDate: '2011', keywords: 'Tiger, Russia'},
        {title: 'Wolf Wars', author: 'Hank Fischer', releaseDate: '1995', keywords: 'Wolf, Wolves, Yellowstone'},
        {title: 'The Man-Eaters of Tsavo', author: 'John Henry Patterson', releaseDate: '1907', keywords: 'Lions, Africa'},
    ];

    new app.LibraryView( books );
});