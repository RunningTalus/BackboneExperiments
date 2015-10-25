// Backbone/ModTodos/js/models/todo.js

define(['underscore', 'backbone'], function(_, Backbone) {
    var TodoModel = Backbone.Model.extend({

        // default attributes for the **todo**.
        defaults: {
            content: 'empty todo...',
            done: false
        },

        initialize: function() {
        },

        // Toggle the 'done' state of this **todo** item.
        toggle: function() {
            this.save({done: !this.get('done')});
        },

        // Remove this **Todo** from **localStorage** and delete its view.
        clear: function() {
            this.destroy();
            this.view.remove();
        }
    });

    return TodoModel;
});