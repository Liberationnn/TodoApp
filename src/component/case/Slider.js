import React from 'react';
import '../../css/slider.css';

class SliderItems extends React.Component {
    render() {
        let style = {
            width: (this.props.items.length + 1) * 605,
            left: this.props.index * -605,
            transitionDuration: this.props.speed + 's'
        };

        return (
            <ul className="sliders" style={style}>
                {
                    this.props.items.map((item, index) => (
                        <li key={index} className="slider"><img src={item.src} alt=""/></li>
                    ))
                }
                <li key={this.props.items.length} className="slider"><img src={this.props.items[0].src} alt=""/></li>
            </ul>
        );
    }
}

class SliderArrows extends React.Component {
    render() {
        return (
            <div className="slider-arrows">
                <span className="arrows arrows-left" onClick={() => this.props.move(-1)}>&lt;</span>
                <span className="arrows arrows-right" onClick={() => this.props.move(1)}>&gt;</span>
            </div>
        );
    }
}

class SliderDots extends React.Component {
    render() {
        return (
            <ul className="slider-dots">
                {
                    this.props.items.map((item, index) => (
                        <li className={"slider-dot " + (index === this.props.index || (this.props.index === this.props.items.length && index === 0) ? "active" : "")} onClick={() => this.props.move(index - this.props.index)} key={index}></li>
                    ))
                }
            </ul>
        );
    }
}

export default class Slider extends React.Component {
    constructor() {
        super();
        this.state = {index: 0};
    }

    // 移动轮播图
    move = (step) => {
        let index = this.state.index + step;
        if (index > this.props.items.length) {
            this.$sliders.style.transitionDuration = '0s';
            this.$sliders.style.left = 0;
            setTimeout(() => {
                index = 1;
                this.$sliders.style.transitionDuration = this.props.speed + 's';
                this.setState({index});
            }, 0);
            return;
        } else if (index < 0) {
            this.$sliders.style.transitionDuration = '0s';
            this.$sliders.style.left = this.props.items.length * -605 + 'px';
            setTimeout(() => {
                index = this.props.items.length - 1;
                this.$sliders.style.transitionDuration = this.props.speed + 's';
                this.setState({index});
            }, 0);
            return;
        }
        this.setState({index});
    };

    // 启动自动轮播
    startGo = () => {
        this.$timer = setInterval(() => {
            this.move(1);
        }, this.props.delay * 1000);
    };

    // 停止自动轮播
    stopGo = () => {
        if (this.props.pause) {
            clearInterval(this.$timer);
        }
    };

    componentDidMount() {
        this.$sliders = document.querySelector(".sliders");
        if (this.props.auto) {
            this.startGo();
        }
    }

    render() {
        return (
            <div className="slider-wrapper" onMouseOver={this.stopGo} onMouseOut={this.startGo}>
                <SliderItems items={this.props.items} index={this.state.index} speed={this.props.speed}/>
                <SliderArrows move={this.move}/>
                <SliderDots items={this.props.items} move={this.move} index={this.state.index}/>
            </div>
        );
    }
}