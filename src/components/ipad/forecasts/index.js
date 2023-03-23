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
                            selected = {this.props.selected}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[1]}
                            selected = {this.props.selected}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[2]}
                            selected = {this.props.selected}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[3]}
                            selected = {this.props.selected}
                            handleClick = {this.props.handleClick}
                        />
                        <Box 
                            forecast = {this.props.forecasts[4]}
                            selected = {this.props.selected}
                            handleClick = {this.props.handleClick}
                        />
                </div>
            </div>
        );
    }
}