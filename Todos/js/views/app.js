// js/views/app.js

var app = app || {};

// The application
// ---------------

// Our overall ** AppView ** is the top-level piece of UI.

app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of the app already present in the HTML.

    el: '#todoapp',  // stores a selector targeting the DOM element with an id of #todoapp in index.html

    // Our template for the line of statistics at the bottom of the app.

    statsTemplate: _.template( $('#stats-template').html() ), // call to Underscores microtemplating and #stats-template

    // At initialization we bind to the relevant events on the 'Todos' collection, when items are added or changed.
    // this.$() finds elements relative to this.$el

    initialize: function() {                            // method implicitly called on instantiation
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('footer');
        this.$main = this.$('#main');

        this.listenTo(app.Todos, 'add', this.addOne);   // binding to add events on the Todo Collection
        this.listenTo(app.Todos, 'reset', this.addAll); // binding to reset events on the Todo Collection

    },

    // Add a single todo item to the list by creating a view for it, and appending its element to the '<ul>'.
    // When an add event is fired, the addOne() method is called and passed the new model.
    // addOne() creates an instance of the TodoView view, renders it, and appends the resulting element to the todo list

    addOne: function( todo ) {
        var view = new app.TodoView({ model: todo });
        $('#todo-list').append( view.render().el );
    },

    // Add all items in the **Todos** collection at once.
    // When a reset event occurs( we update the collection in bulk).
    // i.e. When the todos are loaded from localStorage.
    // addAll() is called and iterates over all of the todos currently in our collection, firing addOne() for each item.

    // NOTE: We are able to use this within addAll() to refer to the view because listenTo() implicitly set the
    // callback's context to the view when it created the binding.

    addAll: function() {
        this.$('#todo-list').html('');
        app.Todos.each(this.addOne, this);
    }

});