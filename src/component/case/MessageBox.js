import React from 'react';

class Message extends React.Component {
    render() {
        let {message, index} = this.props;
        return (
            <li className="list-group-item" key={index}>
                {message.username}: {message.content} <span className="pull-right">{message.createAt.toLocaleString()}</span>
                <button className="btn btn-danger btn-xs" onClick={() => this.props.removeMessage(index)}>删除</button>
            </li>
        );
    }
}

class MessageList extends React.Component {
    render() {
        return (
            <ul className="list-group">
                {
                    this.props.messages.map((message, index) => (
                        <Message message={message} index={index} removeMessage={this.props.removeMessage}/>
                    ))
                }
            </ul>
        );
    }
}

class MessageForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        // 获得用户名的值
        let username = this.username.value;
        // 获得内容的值
        let content = this.content.value;
        this.props.addMessage({
            username,
            content,
            createAt: new Date()
        });
        this.username.value = this.content.value = "";
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="control-label">用户名</label>
                    <input ref={x => this.username = x} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="content" className="control-label">内容</label>
                    <input ref={x => this.content = x} type="text" className="form-control"/>
                </div>
                <div className="form">
                    <button className="btn btn-primary" onClick={this.handleSubmit}>发表</button>
                </div>
            </form>
        );
    }
}

export default class MessageBox extends React.Component {
    constructor() {
        super();
        // 定义默认状态对象，message是消息的数组
        this.state = {messages: []};
    }

    addMessage = (message) => {
        let messages = [...this.state.messages, message];
        this.setState({
            messages
        });
    };

    removeMessage = (index) => {
        this.state.messages.splice(index, 1);
        this.setState({
            messages: [...this.state.messages]
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h2 className="text-center">留言板</h2>
                            </div>
                            <div className="panel-body">
                                <MessageList messages={this.state.messages} removeMessage={this.removeMessage}/>
                            </div>
                            <div className="panel-footer">
                                <MessageForm addMessage={this.addMessage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}