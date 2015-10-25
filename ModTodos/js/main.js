// Backbone/ModTodos/js/main.js

// Require.js allows us to configure mappings to paths as demonstrated below:
require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min.js',
        underscore: '../bower_components/underscore/underscore-min.js',
        backbone: '../bower_components/backbone/backbone-min.js',

        // storage has built in support for requirejs-hence, it doesn't need to configured in 'shim'
        storage: '../bower_components/backbone.localStorage/backbone.localStorage-min.js',
        text: 'libs/require/text'
    },

    shim: {

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        }
    }

});

require([ 'views/app', 'collections/todos' ], function(AppView, AppCollection){
    var app_view = new AppView({
        collection: AppCollection
    });

});