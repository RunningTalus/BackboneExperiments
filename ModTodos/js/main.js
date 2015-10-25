// Backbone/ModTodos/js/main.js

require.config({
    baseUrl: '../',  // path to use for module lookups
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min.js',
        underscore: 'bower_components/underscore/underscore-min.js',
        backbone: 'bower_components/backbone/backbone-min.js',
        text: 'require/text.js'
    }
});

require(['views/app'], function(AppView){   // Loads and instantiates the primary view (views/app.js).
    var app_view = new AppView;
});