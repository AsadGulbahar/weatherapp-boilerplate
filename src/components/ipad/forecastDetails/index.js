// import preact 
import { h, render, Component } from 'preact';
// import stylesheets for ipad
import style from './style';

export default class ForecastDetails extends Component {
    render() {
        return (
            <div class={style.section}>
            <div class={style.container}>
                    <div class={style.box}>
                        <div class={style.location}>{this.props.location}</div>
                        <div class={style.temperature}>
                            {this.props.temp}
                                <img src={this.props.icon}></img>
                        </div>
                        
                    </div>
                    <div class={style.datetime}>
                        <div class={style.time}>{this.props.time}</div>
                        <div class={style.date}>{this.props.date}|</div>                            
                    </div>

                    
            </div>
        </div>
        );
    }
}