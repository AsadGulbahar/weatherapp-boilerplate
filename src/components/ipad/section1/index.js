// import preact 
import { h, render, Component } from 'preact';
import style from './style';


export default class Section1 extends Component{

    render(){
        return( 
            <div class={style.section}>
                <div class={style.container}>
                        <div class={style.box}>
                            <div class="input-container">
                                <input type="text" placeholder="Change Location" onChange={this.props.handleChange} />
                            </div>
                            <div class={style.location}>{this.props.location}</div>
                            <div class={style.temperature}>{this.props.temperature}</div>
                            <div class={style.conditions}><img src={this.props.icon}></img></div>
                        </div>
                        <div class={style.datetime}>
                            <div class={style.date}>{this.props.date}</div>
                            <div class={style.time}>{this.props.time}</div>
                        </div>
                </div>
            </div>
        );
    }
}