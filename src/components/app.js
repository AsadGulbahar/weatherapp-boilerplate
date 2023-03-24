// import preact
import { h, Component } from 'preact';

// import required Components from 'components/'
import Ipad from './ipad';

export default class App extends Component {
//var App = React.createClass({

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){

		// changed boiler plate code to only display ipad component by default
		return (
			<div id="app">
				<Ipad/ >
			</div>   				
		);
	}
}