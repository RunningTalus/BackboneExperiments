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

    // Delegated events for creating new items, and clearing completed ones.

    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    // At initialization we bind to the relevant events on the 'Todos' collection, when items are added or changed.
    // this.$() finds elements relative to this.$el

    // We've bound a filterOne() callback to the Todos collection for a change: completed event.
    // This listens for changes to the completed flag for any model in the collection.
    // The affected todo is passed to the callback, which triggers a custom visible event on the model.

    // We've bound a filterAll() callback for a filter event, which works a little like addOne() and addAll().
    // Its responsibility is to toggle which todo items are visible based on the filter currently selected in the UI
    // (all, completed, or remaining) via calls to filterOne().

    // We've used the special all event to bind any event triggered on the the Todos collection to view's render method.

    initialize: function() {                            // method implicitly called on instantiation
        this.allCheckbox = this.$('#toggle-all');
        this.$input = this.$('#new-todo');
        this.$footer = this.$('footer');
        this.$main = this.$('#main');

        this.listenTo(app.Todos, 'add', this.addOne);   // binding to add events on the Todo Collection
        this.listenTo(app.Todos, 'reset', this.addAll); // binding to reset events on the Todo Collection

        this.listenTo(app.Todos, 'change:completed', this.filterOne); // binding callback to change:completed event
        this.listenTo(app.Todos, 'filter', this.filterAll);           // binding callback to filter event
        this.listenTo(app.Todos, 'all', this.render);                 // binding callback to all event

        app.Todos.fetch();  // fetches previously saved todos from localStorage

    },

    // Re-rendering the app just means refreshing the statistics.
    // The rest of the app does NOT change.

    // The #main and #footer sections are displayed or hidden depending on whether there are any todos in the collection.

    // The footer is populated with the HTML produced by instantiating the statsTemplate with the number of completed
    // and remaining todo items.

    // The HTML produced by the preceding step contains a list of filter links.
    // The value of app.TodoFilter, which will be set by our router, is being used to apply the calss selected to the
    // link corresponding to the currently selected filter.
    // This will result in conditional CSS styling being applied to that filter.

    // The allCheckbox is updated based on whether there are remaining todos.


    render: function() {

        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if ( app.Todos.length ) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + (app.TodoFilter || '' ) + '"]')
                .addClass('selected');

        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;

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
    },

    filterOne: function(todo) {
        todo.trigger('visible');
    },

    filterAll: function() {
        app.Todos.each(this.filterOne, this);
    },

    // Generate the attributes for a new todo item.

    newAttributes: function() {
        return {
            title: this.$input.val().trim(),
            order: app.Todos.nextOrder(),
            completed: false
        };
    },

    // If you hit return in the main input field, create a new Todo Model.
    // This persists it to localStorage.
    // Resets the main <input/> field value to prepare it for the next entry.
    // Model is populated by newAttributes(), which returns an object literal of the title, order, and completed state
    // of the new item.
    // NOTE: this is referring to the view and not the DOM element since the callback was bound using the events hash.

    createOnEnter: function( event ) {
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
            return;
        }

        app.Todos.create( this.newAttributes() );
        this.$input.val('');
    },

    // Clear all completed todo items, destroying their models.
    // Removes the items in the todo list that have been marked as completed with the user clicks the clear-completed
    // checkbox.
    // This checkbox will be in the footer populated by the #stats-template.

    clearCompleted: function() {
        _.invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    // Allows a user to mark all of the items in the todo list as completed by clicking on the toggle-all checkbox.

    toggleAllComplete: function(){
        var completed = this.allCheckbox.checked;

        app.Todos.each(function( todo ) {
            todo.save({
                'completed': completed
            });
        });
    }
});