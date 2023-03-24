// import preact 
import { h, render, Component } from 'preact';
import Forecasts from '../forecasts';
import style from './style';


export default class Header extends Component{
        

    render(){
        if (this.props.danger){ // if danger is true, apply the danger style
            return (
                <header class={style.header}>
                <span class={style.warning}> 
                    {this.props.message}
                </span>
            </header>
            )
        } else { // if danger is false, apply the safe style
            return (
                <header class={style.header}>
                    <span class={style.safe}> 
                        {this.props.message}
                    </span>
                </header>
            )
        }
        

    }
    
}