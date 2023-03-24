// import preact 
import { h, render, Component } from 'preact';
import style from './style';


export default class Section1 extends Component{

    render(){

        return( 
            <div class={style.section}>
                <div class={style.container}>
                        <div>
                            <div class={style.input}>
                                <input type="text" placeholder="Change Location" onChange={this.props.handleChange} />
                            </div>
                            <div class={style.location}>{this.props.location}</div>
                            <div class={style.temperature}>
                                <span class={style.text}>
                                    {this.props.temperature} °C
                                    <img src={this.props.icon}></img>
                                </span>
                            </div>
                        </div>
                        <div class={style.datetime}>
                            <div class={style.time}>{this.props.time}</div>
                            <div class={style.date}>{this.props.date}</div>                            
                        </div> 
                </div>
            </div>
            
        );
    }
}