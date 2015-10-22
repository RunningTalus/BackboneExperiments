// Backbone/Books/js/app.js

var app = app || {};

$(function() {

    var books = [
        {title: 'Grizzly Years: In Search of the American Wilderness', author: 'Doug Peacock', releaseDate: '1990', keywords: 'Grizzly, Wilderness'},
        {title: 'Beast In The Garden: The True Story of a Predator\'s Deadly Return to Suburban America', author: 'David Baron', releaseDate: '2005', keywords: 'Cougar, Mountain Lion, Catamount, Panther, Boulder'},
        {title: 'The Tiger: A True Story of Vengeance and Survival', author: 'John Vaillant', releaseDate: '2011', keywords: 'Tiger, Russia'},
        {title: 'Wolf Wars', author: 'Hank Fischer', releaseDate: '1995', keywords: 'Wolf, Wolves, Yellowstone'},
        {title: 'The Man-Eaters of Tsavo: And Other East African Adventures', author: 'John Henry Patterson', releaseDate: '1907', keywords: 'Lions, Africa'},
    ];

    new app.LibraryView( books );
});