// import preact 
import { h, render, Component } from 'preact';
import Forecasts from '../forecasts';
import style from './style';


export default class Header extends Component{

    constructor(props){
        super(props)
        // danger state
        this.state.danger = false;
        // danger message state
        this.state.message = null;
    }


    safetyCheck(){
        console.log("in safetyCheck")
        let dangerMessage = "";
        let moreThanOneDanger = false; // for appending commas in danger message if needed
        let nextSafeTime = "";

        // dangerous weather conditions that stop flight take off
        let maxTemp = 47
        let minPressure = 950
        let maxHumidity = 95
        let maxWind = 34
        // let maxTemp = 1
        // let minPressure = 10000
        // let maxHumidity = 1
        // let maxWind = 1

        if(parseFloat(this.props.temp) > maxTemp){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "high temperature: " + this.props.temp
            moreThanOneDanger = true
        }
        if(parseFloat(this.props.pressure) > minPressure){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "low pressure: " + this.props.pressure
            moreThanOneDanger = true

        }
        if(parseFloat(this.props.humidity) > maxHumidity){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "high humidity level: " + this.props.humidity
            moreThanOneDanger = true

        }
        if(parseFloat(this.props.wind) > maxWind){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "high wind speeds: " + this.props.wind
            moreThanOneDanger = true
        }

        if(dangerMessage == ""){
            this.setState({
                danger: false,
                message: "No Hazards: Safe to Fly"
            })
            
        }
        else{
            for (let i = 0; i < this.props.forecasts.length; i++) {
                const forecast = this.props.forecasts[i];
                const forecastTemperature = forecast.temp;
                const forecastAirPressure = forecast.pressure;
                const forecastHumidity = forecast.humidity;
                const forecastWindSpeed = forecast.windSp;
                const forecastTime = forecast.time;

                console.log("Forecast: " + forecastTemperature + forecastAirPressure + forecastHumidity + forecastWindSpeed + forecastTime)


                if(forecastTemperature < 47 && forecastAirPressure > 950 && forecastHumidity < 95 && forecastWindSpeed < 34) {
                    nextSafeTime += forecastTime
                    break;
                }
            }
            this.setState({
                danger: true,
                message: "NOT SAFE TO FLY: " + dangerMessage + " | Safe to Fly at Approx: " + nextSafeTime
            })
        }   
        console.log(this.state.message)
    }

        
    componentDidMount(){
        this.safetyCheck();
    }

    render(){
        if (this.state.danger){
            return (
                <header class={style.header}>
                <span class={style.warning}> 
                    {this.state.message}
                </span>
            </header>
            )
        } else {
            return (
                <header class={style.header}>
                    <span class={style.safe}> 
                        {this.state.message}
                    </span>
                </header>
            )
        }
        

    }
    
}