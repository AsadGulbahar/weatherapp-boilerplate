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
                    {/* wrapping in p tag adds line break */}
                    <span class={style.date}>{this.props.forecast.date} {this.props.forecast.time}</span>
                </p>
                <div>
                    <img src={this.props.forecast.icon}></img>
                    <div class={style.temp}>{this. props.forecast.temp}</div>
                    <div class={style.wind}>Wind: {this.props.forecast.windSp} {this.props.forecast.windDir}</div>
                    <div class={style.pressure}>Pressure: {this.props.forecast.pressure}</div>
                </div>
            </div>
        );
    }
}

// forecast object
// let forecast = {
//     loc: this.state.location,
//     date: new Date(data.list[i].dt_txt).toLocaleDateString(),
//     time: new Date(data.list[i].dt_txt).toLocaleTimeString(),
//     temp: data.list[i].main.temp + " °C",
//     cond: data.list[i].weather[0].description,
//     windSp: data.list[i].wind.speed + " m/s",
//     windDir: data.list[i].wind.deg + "°",
//     humidity: data.list[i].main.humidity + "%",
//     pressure: data.list[i].main.pressure + " hPa",
//     clouds: data.list[i].clouds.all + "%",
//     icon: "https://openweathermap.org/img/wn/" +data.list[i].weather[0].icon+ "@2x.png"
// }