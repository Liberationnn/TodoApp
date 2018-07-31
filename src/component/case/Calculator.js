import React from 'react';

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}

// 将华氏温度转换成摄氏温度
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

// 将摄氏温度转换成华氏温度
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

// 温度转换
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    // return rounded.toString();
    return rounded;
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

// 温度输入框组件
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { temperature: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureInput(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Entry temperature in {scaleNames[scale]}</legend>
                <input
                    type="number"
                    value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { temperature: '', scale: 'c' };
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temperature) {
        this.setState({ temperature, scale: 'c' });
    }

    handleFahrenheitChange(temperature) {
        this.setState({ temperature, scale: 'f' });
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput 
                    scale="c"
                    temperature={celsius}
                    onTemperatureInput={this.handleCelsiusChange} />
                
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureInput={this.handleFahrenheitChange} />

                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

export default Calculator;