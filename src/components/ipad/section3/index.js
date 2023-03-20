// import preact 
import { h, render, Component } from 'preact';
import style from './style';


export default class Section3 extends Component{

    render(){
        return( 
            <div class={style.section}>
                <span class={style.title}>{this.props.title}</span>
                <div class={style.container}>
                    <div class={style.box}>
                        
                    </div>
                    <div class={style.box}>
                        
                    </div>
                    <div class={style.box}>
                        
                    </div>
                    <div class={style.box}>
                        
                    </div>
                    <div class={style.box}>
                        
                    </div>
                </div>
            </div>
        );
    }
}