import React, { Component } from 'react';

export default class Suggest extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            words: ['a', 'b', 'c', 'd', 'e'],
            index: -1
        };
    }

    handleChange = (event) => {
        let wd = event.target.value;
        this.wd = wd;
        this.setState({ value: wd });
    };

    handleKeyDown = (event) => {
        let code = event.keyCode;
        if (code === 38 || code === 40) {
            let index = this.state.index;
            if (code === 38) {
                if (index === -1) {
                    index = this.state.words.length - 1;
                } else {
                    index--;
                }
            } else {
                if (index === this.state.words.length - 1) {
                    index = -1;
                } else {
                    index++;
                }
            }
            let value = index === -1 ? this.wd : this.state.words[index];
            this.setState({ index, value });
        } else if (code === 13) {
            window.location = 'https://www.baidu.com/s?wd=' + event.target.value;
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyDown}
                                />
                            </div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {
                                        this.state.words.map((word, index) => (
                                            <li
                                                key={index}
                                                className={"list-group-item " + (index === this.state.index ? 'active' : '')}>
                                                {word}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}