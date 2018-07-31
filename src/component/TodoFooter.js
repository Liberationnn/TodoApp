import React from 'react';
import * as filterTypes from './filter-types';

export default class TodoFooter extends React.Component {
    render() {
        return (
            <div className="row">
                <div style={{height: "29.6px", lineHeight: "29.6px"}} className="col-md-3 text-center">
                    还有{this.props.activeTodoCount}件待办事项
                </div>
                <div className="col-md-6 text-center">
                    <button className={`btn ${this.props.filterType === filterTypes.ALL ? "btn-success" : "btn-default"} btn-sm`}
                            onClick={() => this.props.changeFilterType(filterTypes.ALL)}>
                        全部
                    </button>
                    <button style={{marginLeft: 5, marginRight: 5}}
                            className={`btn ${this.props.filterType === filterTypes.ACTIVE ? "btn-success" : "btn-default"} btn-sm`}
                            onClick={() => this.props.changeFilterType(filterTypes.ACTIVE)}>
                        未完成
                    </button>
                    <button className={`btn ${this.props.filterType === filterTypes.COMPLETED ? "btn-success" : "btn-default"} btn-sm`}
                            onClick={() => this.props.changeFilterType(filterTypes.COMPLETED)}>
                        已完成
                    </button>
                </div>
                <div className="col-md-3 text-center">
                    <button disabled={!this.props.completedTodoCount} className="btn btn-danger btn-sm" onClick={this.props.removeCompleted}>
                        删除已完成
                    </button>
                </div>
            </div>
        );
    }
}