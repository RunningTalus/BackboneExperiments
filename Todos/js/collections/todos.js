// js/collections/todos.js

var app = app || [];

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote server.

var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model

    model: app.Todo,

    // Save all of the todo items under the '"todos-backbone"' namespace.
    // NOTE that you will need to have the Backbone localStorage plug-in loaded inside your page in order for this to work.
    // If testing in the console without this present, comment out the next line to avoid running into an exception.

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Filter down the list of all todo items that are finished.
    // RETURNS an array of completed todos.

    completed: function() {
        return this.filter(function( todo ) {
            return todo.get('completed');
        });
    },

    // Filter down the list to only todo items that are still not finished.
    // RETURNS an array of remaining/uncompleted todos.

    remaining: function() {

        // Apply allows us to define the context of this within our function scope.

        return this.without.apply( this, this.completed() );
    },

    // We keep the Todos in sequential order, despite being saved by unordered GUID in the database.
    // This generates the next order number for new items.
    // The nextOrder() method implements a sequence generator

    nextOrder: function() {
        if ( !this.length ) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    // The comparator() method sorts items by their insertion order.

    comparator: function ( todo ) {
        return todo.get('order');
    }

});

// Create our global collection of **Todos**.

app.Todos = new TodoList();

//
// NOTE: The following are Underscore Methods
// this.filter
// this.without
// this.last