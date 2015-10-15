var app = app || [];

/* Todo model */
/* ---------- */
/* Basic **Todo** Model has 'title', 'order', and 'completed' attributes. */

app.Todo = Backbone.model.extend({

    /* Default attributes ensure that each todo created has 'title' and 'completed' attributes. */

    defaults: {
        title: '';
        completed: false;
    },

    /* Toggle the 'completed' state of this todo item. */

    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }

});