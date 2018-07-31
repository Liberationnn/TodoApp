import React from 'react';

export default class TodoItem extends React.Component {
    render() {
        let {id, title, completed} = this.props.todo;

        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-1">
                        <input type="checkbox" onChange={() => this.props.toggle(id)} checked={completed}/>
                    </div>
                    <div className="col-md-10" style={{textDecoration: completed ? 'line-through' : ''}}>
                        {title}
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-danger btn-xs" onClick={() => this.props.removeTodo(id)}>X</button>
                    </div>
                </div>
            </li>
        );
    }
}