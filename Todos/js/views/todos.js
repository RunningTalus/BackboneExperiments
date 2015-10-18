// js/views/todos.js

var app = app || {};

// Todo Item View
// --------------

// The DOM element for a todo item...

app.TodoView = Backbone.View.extend({

    // ... is a list tag

    tagName: 'li',

    // Cache the template function.
    template: _.template( $('#item-template').html() ),

    // The DOM events specific to an item.
    // This is the events hash, with QTY#3 callbacks: edit(), updateOnEnter(), and close()
    events: {
        'click .toggle': 'togglecompleted',
        'dblclick label': 'edit',
        'click .destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    // The TodoView listens for a change event to its model, re-rendering.
    // Since there is a one-to-one correspondence between a **Todo** and a **TodoView** in this app, we set a direct
    // reference on the model for convenience.
    // When a todo gets updated, the application will re-render the view and visually reflect the changes.
    // NOTE: The model passed in the arguments hash by out AppView is automatically available as this.model.

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    // Re-renders the titles of the todo item.
    // The rendered template is now present under this.el and can be appended to the todo list in the UI.

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );

        this.$el.toggleClass( 'completed', this.model.get('completed') );
        this.toggleVisible();

        this.$input = this.$('.edit');                          // caches the input element within the instantiated template into this.input
        return this;
    },

    // Toggles the visibility of an item.

    toggleVisible: function() {
        this.$el.toggleClass( 'hidden', this.isHidden());
    },

    // Determines if an item should be hidden.

    isHidden: function() {
        var isCompleted = this.model.get('completed');
        return ( // hidden cases only
            (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
        );
    },

    // Toggle the '"completed"' state of the model.

    toggleCompleted: function() {
        this.model.toggle();
    },

    // Switch this view into '"editing"' mode, displaying the input field.
    // Changes the current view into editing mode when a user double-clicks an existing item in the todo list.
    // This allows the user to change the existing value of the item's title attribute.

    edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // Close the '"editing"' mode, saving the changes to the todo.
    // Trims the value of the current text in our <input/> field, ensuring that we don't process it further if it does
    // NOT contain any text.
    // If a valid value is entered, we save the changes to the current Todo model and close the editing mode by
    // removing the corresponding CSS class.

    close: function() {
        var value = this.$input.val().trim();

        if ( value ) {
            this.model.save({title: value});
        }

        this.$el.removeClass('editing');
    },

    // If you hit 'enter', we are through editing the item.
    // Checks that the user has pressed the RETURN/ENTER key and executes the close() function.

    updateOnEnter: function(e) {
        if ( e.which === ENTER_KEY ) {
            this.close();
        }
    },

    // Remove the item, destroy the model from localStorage and delete its view.

    clear: function() {
        this.model.destroy();
    }

});