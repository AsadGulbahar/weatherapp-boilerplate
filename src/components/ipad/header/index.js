// import preact 
import { h, render, Component } from 'preact';
import Forecasts from '../forecasts';
import style from './style';


export default class Header extends Component{
        

    render(){
        console.log(this.props.message)
        if (this.props.danger){
            return (
                <header class={style.header}>
                <span class={style.warning}> 
                    {this.props.message}
                </span>
            </header>
            )
        } else {
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