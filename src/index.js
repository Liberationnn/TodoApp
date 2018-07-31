import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './component/TodoApp';
import TodoModel from './component/TodoModel';

let model = new TodoModel();
let render = () => {
    ReactDOM.render(
        <TodoApp model={model}/>,
        document.getElementById('root')
    );
};
model.subscribe(render);
render();