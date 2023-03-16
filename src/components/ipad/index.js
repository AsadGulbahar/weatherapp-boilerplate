// import preact 
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_ipad from '../button/style_ipad';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Ipad extends Component {
	//var Ipad = React.createClass({
	
	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.useCurrentLocation = true;
		// latitude state
		this.state.latitute = "";
		//	longitude state
		this.state.longitude = "";
		// current city state
		this.state.currentCity = "";
		// current country state
		this.state.currentCountry = "";
		// temperature state
		this.state.temp = "";
		// weather conditions state
		this.state.cond = "";
		// weather icon state
		this.state.icon = null;
	}

	setLocation(position) {
		if (this.state.useCurrentLocation){
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			})
		} else {
			this.setState({
				latitude: 51.5048,
				longitude: 0.0495
			})
		}
	}

	// function to get the current location of the user
	getLocation() {
		if (window.navigator.geolocation) {
		  	window.navigator.geolocation.getCurrentPosition(
				this.setLocation.bind(this),
				(e) => {
					console.log("getLocation error: ", e);
				}
		  	);	
		} else {
		  	console.log("navigator not supported");
		}
	}


	//url url : "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=b406cf8ad004accec63c04f51a061e82",
	//function to fetch location, temperature and weather conditions from openweathermap API
	componentDidMount() {

		if (this.state.useCurrentLocation){
			if (window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(		
					(position) => {
						if (position != null){
							console.log(position.coords.latitude, position.coords.longitude)
							const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b406cf8ad004accec63c04f51a061e82&units=metric`
							console.log(url)
							fetch(url)	
								.then((resp) => resp.json())
								.then(data => {
									console.log(data);
									this.setState({
										currentCity: data.name,
										currentCountry: data.sys.country,
										cond: data.weather[0].description,
										temp: data.main.temp,
										icon: "https://openweathermap.org/img/wn/" +data.weather[0].icon+ "@2x.png" 
									});
								})
								console.log("test", this.state.temp)
						} else {console.log("position is null")}
						
					} ,(e) => {	
						console.log("geolocation error: ", e);
					}
				);
			} else {
				console.log("navigator not supported");
			}
		} else {
		this.setState({
			latitude: 51.5048,
			longitude: 0.0495
			})
		}
		console.log(this.state.latitude, this.state.longitude)

	}
	
	// the main render method for the ipad component
	render() { 
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		const element = document.getElementById("location")
		if (element){
			element.addEventListener("change", function(){
				var selectedValue = this.value;
				console.log(selectedValue)
				if (selectedValue == "current"){
					this.setState({useCurrentLocation: true});
				} else { this.setState({useCurrentLocation: false});}
				console.log(selectedValue);
			this.componentDidMount();
			});
		}

	
		// display all weather data
		return (
			<div class={style.container}>
				<header class={style.header}>
					<span class={style.warning}></span>
				</header>
				<div class={style.section}>

					<select name="location" id="location">
						<option value=""disabled selected>Change Location</option>
						<option value="current">Current Location</option>
						<option value="EGLC">EGLC London City Airport</option>
					</select>
					<div class={style.city}>{this.state.currentCity}, {this.state.currentCountry}</div>
					<div class={style.temperature}>{this.state.temp}°C</div>
					<div class={style.conditions}><img src={this.state.icon}></img></div>
				</div>
				<div class={style.section}>
					<hr></hr>
				</div>
				<div class={style.section}>
					<hr></hr>
				</div>
				<div class={style.details}></div>
			</div>
		);
	}

}

// "coord":{"lon":-0.1257,"lat":51.5085},
// 	"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
// 	"base":"stations",
// 	"main":{"temp":8.4,"feels_like":5.74,"temp_min":7.35,"temp_max":9.82,"pressure":1015,"humidity":61},
// 	"visibility":10000,
// 	"wind":{"speed":4.63,"deg":170},
// 	"clouds":{"all":100},"dt":1678885703,
// 	"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1678860938,"sunset":1678903415},
// 	"timezone":0,
// 	"id":2643743,
// 	"name":"London",
// 	"cod":200