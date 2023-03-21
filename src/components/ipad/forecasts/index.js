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
                        <Box 
                            forecast = {this.props.forecasts[0]}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[1]}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[2]}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[3]}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[4]}
                            handleClick = {this.props.handleClick}
                        />
                </div>
            </div>
        );
    }
}