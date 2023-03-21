// import preact 
import { h, render, Component } from 'preact';
import style from './style';
// import Box component
import Box from './box';


export default class Forecasts extends Component{



    render(){

        return( 
            <div class={style.section}>
                <span class={style.title}>{this.props.title}</span>
                <div class={style.container}>
                    {/* <div class={style.box}> */}
                        <Box 
                            forecast = {this.props.forecasts[0]}
                        />
                    {/* </div> */}
                    {/* <div class={style.box}> */}
                        <Box 
                            forecast = {this.props.forecasts[1]}
                        />
                    {/* </div>                     */}
                    {/* <div class={style.box}> */}
                        <Box 
                            forecast = {this.props.forecasts[2]}
                        />
                    {/* </div>                     */}
                    {/* <div class={style.box}> */}
                        <Box 
                            forecast = {this.props.forecasts[3]}
                        />
                    {/* </div>                     */}
                    {/* <div class={style.box}> */}
                        <Box 
                            forecast = {this.props.forecasts[4]}
                        />
                    {/* </div> */}
                </div>
            </div>
        );
    }
}