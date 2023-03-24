// import preact 
import { h, render, Component } from 'preact';
import style from './style';


export default class Box extends Component {
    // a constructor with initial set states
    constructor(props) {
        super(props);
    }
    
    // seperate function used due to errors with using arguments in the onClick function
    handleClickInBox = () => {
        this.props.handleClick(this.props.forecast)
    }

    // a call to the render function: using JSX syntax
    render() {
        // if the forecast is selected, change the styling: adds gray border
        if (this.props.selected === this.props.forecast) {
            style.box = style.selected;
        } else {
            style.box = style.unselected;
        }
        return (
            <div class={style.box} onClick={this.handleClickInBox}>
                <p> 
                    <span class={style.date}>{this.props.forecast.time} | {this.props.forecast.date}</span>
                </p>
                <div>
                    <img src={this.props.forecast.icon}></img>
                    <div class={style.temp}>{this. props.forecast.temp} °C</div>
                    <div class={style.wind}>Wind: {this.props.forecast.wind} knots {this.props.forecast.windDir}°</div>
                    <div class={style.pressure}>Pressure: {this.props.forecast.pressure} hPa</div>
                </div>
            </div>
        );
    }
}