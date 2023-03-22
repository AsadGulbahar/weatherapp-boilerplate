// import preact 
import { h, render, Component } from 'preact';
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

        // dangerous weather conditions that stop flight take off
        let maxTemp = 47
        let minPressure = 950
        let maxHumidity = 95
        let maxWind = 34

        if(this.props.temp > maxTemp){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "high temperature: " + this.props.temp + " °C"
            moreThanOneDanger = true
        }
        if(this.props.pressure < minPressure){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "low pressure: " + this.props.pressure + " hPa"
            moreThanOneDanger = true

        }
        if(this.props.humidity > maxHumidity){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "high humidity level: " + this.props.humidity + "%"
            moreThanOneDanger = true

        }
        if(this.props.wind > maxWind){
            if (moreThanOneDanger){
                dangerMessage += ", "
            }
            dangerMessage += "high wind speeds: " + this.props.wind + " m/s"
            moreThanOneDanger = true
        }

        if(dangerMessage == ""){
            this.setState({
                danger: false,
                message: "No Hazards: Safe to Fly"
            })
            
        }
        else{
            this.setState({
                danger: true,
                message: "DANGER - NOT SAFE TO FLY: " + dangerMessage
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