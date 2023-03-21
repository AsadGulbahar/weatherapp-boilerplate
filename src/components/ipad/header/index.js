// import preact 
import { h, render, Component } from 'preact';
import style from './style';


export default class header extends Component{
    danger = false
    safetyCheck(){
        message = ""
        tempMessage = ""
        cloudMessage = ""
        pressureMessage = ""
        humidityMessage = ""
        windMessage = ""

        // dangerous weather conditions that stop flight take off
        maxTemp = 47
        maxClouds = 95
        minPressure = 950
        maxHumidity = 95
        maxWind = 34

        tempDanger = false
        cloudsDanger = false
        pressureDanger = false
        humidityDanger = false
        windDanger = false

        danger = false

        if(temp>maxTemp){
            tempDanger = true
            tempMessage = "high temperature of " + temp + " °C , "
        }
        if(clouds>maxClouds){
            cloudsDanger = true
            cloudMessage = "high cloud coverage of " + clouds + "% , "
        }
        if(pressure<minPressure){
            pressureDanger = true
            pressureMessage = "low pressure of " + pressure + " hPa , "
        }
        if(humidity>maxHumidity){
            humidityDanger = true
            humidityMessage = "high humidity level of " + humidity + "%, "
        }
        if(wind>maxWind){
            windDanger = true
            windMessage = "high wind speeds of " + wind + " m/s"
        }



        if(tempDanger == false | cloudsDanger == false | pressureDanger == false | humidityDanger == false | windDanger == false){
            danger = false
            message = "No Hazards: Safe to Fly"
        }
        else{
            danger = true
            message = "NOT safe to fly due to " + tempMessage + cloudMessage + pressureMessage + humidityMessage + windMessage
        }

        return message
    }

        
    }



    render(){
        return (
            <header class={style.header}>
                <span class={style.warning}></span>
                safetyCheck()
                {/* call function to display message */}
                if (danger = false) {
                    //make background colour green
                }
                else{
                    //make background colour red
                }

            </header>
        )
    }
}