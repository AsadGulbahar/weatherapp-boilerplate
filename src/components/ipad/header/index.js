// import preact 
import { h, render, Component } from 'preact';
import style from './style';


export default class header extends Component{

    render(){
        return (
            <header class={style.header}>
                <span class={style.warning}></span>
            </header>
        )
    }
}