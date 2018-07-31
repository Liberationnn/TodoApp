import React from 'react';

export default class TodoModel {
    constructor() {
        this.STORE_KEY = 'todos';
        this.todos = localStorage.getItem(this.STORE_KEY) ? JSON.parse(localStorage.getItem(this.STORE_KEY)) : [];
        this.listeners = [];
    }

    subscribe = (listener) => {
        this.listeners.push(listener);
    };

    emit = () => {
        this.listeners.forEach(listener => listener());
    };

    notify = (todos) => {
        localStorage.setItem(this.STORE_KEY, JSON.stringify(todos));
        this.todos = todos;
        this.emit();
    };

    addTodo = (todo) => {
        let todos = [...this.todos, todo];
        this.notify(todos);
    };

    toggle = (id) => {
        let todos = this.todos;
        todos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        this.notify(todos);
    };

    toggleAll = (e) => {
        let checked = e.target.checked;
        let todos = this.todos;
        todos = todos.map(todo => {
            todo.completed = checked;
            return todo;
        });
        this.notify(todos);
    };

    removeTodo = (id) => {
        let todos = this.todos;
        todos.forEach((todo, index) => {
            if (todo.id === id) {
                todos.splice(index, 1);
            }
        });
        this.notify(todos);
    };

    removeCompleted = () => {
        let todos = this.todos;
        todos = todos.filter(todo => !todo.completed);
        this.notify(todos);
    };
}