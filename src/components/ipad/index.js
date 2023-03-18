// import preact 
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_ipad from '../button/style_ipad';
// import jquery for API calls
import $, { queue } from 'jquery';
// import the Button component
import Button from '../button';
// import PapaParse for CSV parsing
import Papa from 'papaparse';

// simple cache data structure
class Cache {
	constructor() {
		this.inArray = [];
		this.len = 0;
	}

	add = (item) => {
		if (this.len == 20){
			this.inArray.shift();
		}
		this.inArray.push(item);
		this.len++;
	}

	get = (item) => {	
		if (this.inArray.includes(item)){
			this.inArray = this.inArray.filter((e) => e != item);
			this.add(item);
			return item;
		} else {
			return false;
		}
	}
}

export default class Ipad extends Component {
	//var Ipad = React.createClass({
	
	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.locationUsed = "current";
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
		// airport code state
		this.state.airportCode = "";
		// airport name state
		this.state.airportName = "";
		// airports hash map
		this.state.airports = new Map();
		// airports cache
		this.state.airportsCache = new Cache();

	}

	// a call to set the latitude and longitude states
	setCoords(position) {
		if (this.state.locationUsed == "current"){
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			})
		} else {
		}
	}

	// function to get the current location of the user
	getLocation() {
		if (window.navigator.geolocation) {
		  	window.navigator.geolocation.getCurrentPosition(
				this.setCoords.bind(this),
				(e) => {
					console.log("getLocation error: ", e);
				}
		  	);	
		} else {
		  	console.log("navigator not supported");
		}
	}



	// parse airports.csv file into hash table
	parseAirports = () => {
		console.log("parsing airports")
		var airports = new Map();
		$.ajax({
		  type: "GET",
		  url: "/components/ipad/airports.csv",
		  dataType: "text",
		  success: (data) => {processData(data);}
		});
		const processData = (allText) => {
		  var allTextLines = allText.split(/\r\n|\n/);
		  var headers = allTextLines[0].split(',');
		  for (var i=1; i<allTextLines.length; i++) {
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {
			  var airportInfo = [];
			  airportInfo.push(data[2]); // airport name
			  airportInfo.push(data[3]); // latitude
			  airportInfo.push(data[4]); // longitude
			  airports.set(data[0], airportInfo); // airport code & airport info
			}
		  }
		  this.setState({airports: airports});
		  console.log(this.state.airports);
		}
	}
	  

	// function to fetch location, temperature and weather conditions from openweathermap API
	readFromAPI(){
		if (this.state.locationUsed == "current"){
			if (window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(		
					(position) => {
						if (position != null){
							console.log(position.coords.latitude, position.coords.longitude)
							const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=6ef7ec3fa00303e0f850f2f7d7ed228f&units=metric`
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
						} else {console.log("position is null")}
						
					} ,(e) => {	
						console.log("geolocation error: ", e);
					}
				);
			} else {
				console.log("navigator not supported");
			}
		} else {
			const latitude = 41.652355
			const longitude = -4.743492
			
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6ef7ec3fa00303e0f850f2f7d7ed228f&units=metric`
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
		}
	}

	componentDidMount() {
		this.parseAirports();
		this.readFromAPI();
	}

	handleLocationChange = (event) => {
		var selectedValue = event.target.value;
		console.log(selectedValue)
		this.setState({locationUsed: selectedValue});
		this.setCoords();
		this.readFromAPI();
	};

	onItemSelected = (option) => {
		onChange !== undefined && onChange(option.key);
		onChange !== undefined && setInputValue(option.value);
		setOpen(false);
	}
	
	// the main render method for the ipad component
	render() { 
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// const [inputValue, setInputValue] = useState("");



		// display all weather data
		return (
			<div class={style.container}>
				<header class={style.header}>
					<span class={style.warning}></span>
				</header>
				<div class={style.section}>

					


					{/* <select name="location" id="location" onChange={this.handleLocationChange}>
						<option value=""disabled selected>Change Location</option>
						<option value="current">Current Location</option>
						<option value="EGLC">EGLC London City Airport</option>
					</select> */}
					<div class="dropdown-container">
						<div class="input-container">
							<input type="text" placeholder="Change Location" onChange={this.handleLocationChange}/>
							<div class="input-arrow-container">
								<i class="input-arrow"></i>
							</div>
						</div>
						{/* <div class="dropdown">
							<div class="option">Current Location</div>
							{
								options.map(option) => {
									return ( <div class="option" key = {option.key} onClick={() => this.onItemSelected(option)} >{option}</div>)
								}
							}
						</div> */}
					</div>

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

{/* // "coord":{"lon":-0.1257,"lat":51.5085},
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
// 	"cod":200 */}