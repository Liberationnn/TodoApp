import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';
import * as filterTypes from './filter-types';

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: filterTypes.ALL
        };
    }

    changeFilterType = (filterType) => {
        this.setState({filterType});
    };

    render() {
        let todos = this.props.model.todos;
        let completedTodoCount = todos.reduce((count, todo) => count + (todo.completed ? 1 : 0), 0);
        let activeTodoCount = todos.length - completedTodoCount;
        let showTodos = todos.filter(todo => {
            switch (this.state.filterType) {
                case filterTypes.ALL:
                    return true;
                case filterTypes.ACTIVE:
                    return !todo.completed;
                case filterTypes.COMPLETED:
                    return todo.completed;
            }
        });
        let main = (
            <ul className="list-group">
                <li className="list-group-item" style={{display: (todos.length === 0 ? "none" : "block")}}>
                    <input type="checkbox" checked={completedTodoCount === todos.length}
                           onChange={this.props.model.toggleAll}/> {completedTodoCount === todos.length ? "取消全选" : "全选"}
                </li>
                {
                    showTodos.map((todo, index) => <TodoItem key={index} todo={todo} toggle={this.props.model.toggle}
                                                             removeTodo={this.props.model.removeTodo}/>)
                }
            </ul>
        );

        return (
            <div className="container" style={{marginTop: 20}}>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <TodoHeader addTodo={this.props.model.addTodo}/>
                            </div>
                            <div className="panel-body">
                                {main}
                            </div>
                            <div className="panel-footer">
                                <TodoFooter filterType={this.state.filterType} changeFilterType={this.changeFilterType}
                                            activeTodoCount={activeTodoCount} completedTodoCount={completedTodoCount}
                                            removeCompleted={this.props.model.removeCompleted}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}