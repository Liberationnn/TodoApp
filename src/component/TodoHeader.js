import React from 'react';

export default class TodoHeader extends React.Component {
    handleKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value.trim() !== "") {
            let todo = {
                id: Date.now(),
                title: e.target.value,
                completed: false
            };
            this.props.addTodo(todo);
            e.target.value = '';
        }
    };

    render() {
        return (
            <div className="form-group">
                <input
                    className="form-control"
                    autoFocus={true}
                    type="text"
                    placeholder="请输入你想做的事情"
                    onKeyDown={this.handleKeyDown}/>
            </div>
        );
    }
}