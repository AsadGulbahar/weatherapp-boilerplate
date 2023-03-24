// import preact 
import { h, render, Component } from 'preact';
import style from './style';


export default class Section2 extends Component{

    render(){
        return( 
            <div class={style.section}>
                <div class={style.container}>
                    <div class={style.box}>
                        <span class={style.title}>Wind</span>
                        <div class={style.data}>
                            <div>{this.props.wind} knots</div>
                            <div>{this.props.windDir}°</div>
                        </div>
                        
                    </div>
                    <div class={style.box}>
                        <span class={style.title}>Humidity</span>
                        <div class={style.data}>{this.props.humidity}%</div>
                    </div>
                    <div class={style.box}>
                        <span class={style.title}>Pressure</span>
                        <div class={style.data}>{this.props.pressure} hPa</div>
                    </div>
                    <div class={style.box}>
                        <span class={style.title}>Cloud Coverage</span>
                        <div class={style.data}>{this.props.clouds}%</div>
                    </div>
                </div>
            </div>
        );
    }
}