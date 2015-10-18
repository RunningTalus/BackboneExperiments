// js/app.js

var app = app || {};
var ENTER_KEY = 13;

$(function() {

    // Kick things off by creating the **App**.

    new app.AppView();

});

// Add items to the list in the console with...
// window.app.Todos.create({title: 'My first todo items'});
// executes a collection method: Collection.create(attributes, [options])
// Instantiates a new model item of the type passed into the collection definition.

// var secondTodo = window.app.Todos.create({title: 'My second Todo item'});
