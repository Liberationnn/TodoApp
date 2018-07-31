import React from 'react';

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Please write an essay about your favorite DOM element.'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDeafult();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: &nbsp;
                    <textarea value={this.state.value} onChange={this.handleChange} cols="50" rows="3"></textarea>
                </label>
                <br />
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default EssayForm;