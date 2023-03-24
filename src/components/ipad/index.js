// import preact 
import { h, render, Component } from 'preact';
// import stylesheets for ipad
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import PapaParse for CSV parsing
import Papa from 'papaparse';
// import the header component
import Header from './header';
// import the section1 component
import Section1 from './section1';
// import the section2 component
import Section2 from './section2';
// import the Forecasts component
import Forecasts from './forecasts';

export default class Ipad extends Component {
	//var Ipad = React.createClass({
	
	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.forecastUsed = null;
		this.state.locationUsed = "current";
		this.state.latitute = "";
		this.state.longitude = "";
		this.state.location = "";
		this.state.temp = "";
		this.state.cond = "";
		this.state.date = "";
		this.state.time = "";
		this.state.timezone = "";
		this.state.icon = null;
		this.state.windSp = "";
		this.state.windDir = "";
		this.state.humidity = "";
		this.state.pressure = "";
		this.state.clouds = "";
		this.state.airportCode = "";
		this.state.airportName = "";
		this.state.airports = new Map();
		this.state.threeHourForecasts = [];
		this.state.fiveDayForecasts = [];
		this.state.allForecasts = [];
		this.state.danger = false;
		this.state.headerMessage = "";

	}

	// a call to set the latitude and longitude states
	setCoords(position) {
		if (this.state.locationUsed == "current"){
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			})
		} else {
			this.setState({airportCode: this.state.locationUsed})
			this.setState({
				airportName: this.state.airports.get(this.state.airportCode)[0],
				latitude: this.state.airports.get(this.state.airportCode)[1],
				longitude: this.state.airports.get(this.state.airportCode)[2]
			})
		}
		console.log("latitude: ", this.state.latitude, "longitude: ", this.state.longitude)
	}

	// convert to time zone
	convertTimeZone(apiTime, timezone) {
		var parsedApiTime = new Date(apiTime * 1000).toLocaleTimeString([], {timeStyle: 'short'});
		if (timezone != 0) {
			var newTime = apiTime+timezone;
			console.log("apiTime: ", apiTime)
			console.log("timezone: ", timezone)
			console.log(newTime * 1000)
			parsedApiTime = new Date(newTime * 1000).toLocaleTimeString([], {timeStyle: 'short'})
		}
		return parsedApiTime;
	}

	// call to read data from API
	readFromAPI(url){
		console.log("In readFromAPI")
		console.log(url)
		fetch(url)	
		.then((resp) => resp.json())
		.then(data => {
			console.log(data);
			if (data.cod == "400" || data.cod == "404"){
				window.alert("Please enter a valid airport code or city name. Enter 'current' to use your current location.")
			} else {

				let location = "";
				if (this.state.airports.has(this.state.locationUsed)){
					location = this.state.airportCode + " " + this.state.airportName + ", " + data.name + ", " + data.sys.country
				} else {
					location = data.name + ", " + data.sys.country
				}
				let parsedApiTime = this.convertTimeZone(data.dt, data.timezone);
				this.setState({
					loc: location,
					cond: data.weather[0].description,
					temp: data.main.temp + " °C",
					date: new Date().toLocaleDateString(),
					time: parsedApiTime,
					timezone: data.timezone,
					windSp: data.wind.speed + " m/s",
					windDir: data.wind.deg + "°",
					humidity: data.main.humidity + "%",
					pressure: data.main.pressure + " hPa",
					clouds: data.clouds.all + "%",
					icon: "https://openweathermap.org/img/wn/" +data.weather[0].icon+ "@2x.png" 
				});
			}

		})
	}

	// call to read forecast data from API
	readFromAPIforecast (furl){
		console.log("In readFromAPIforecast")
		console.log(furl)
		fetch(furl)	
		.then((resp) => resp.json())
		.then(data => {
			console.log(data);
			if (data.cod == "400" || data.cod == "404"){
				window.alert("Please enter a valid airport code or city name. Enter 'current' to use your current location.")
			} else {
				let tHF = [];
				for (let i = 0; i < 5; i++){
					let parsedApiTime = this.convertTimeZone(data.list[i].dt, this.state.timezone);
					let forecast = {
						loc: this.state.location,
						date: new Date(data.list[i].dt_txt).toLocaleDateString(),
						time: parsedApiTime,
						temp: data.list[i].main.temp + " °C",
						cond: data.list[i].weather[0].description,
						windSp: data.list[i].wind.speed + " m/s",
						windDir: data.list[i].wind.deg + "°",
						humidity: data.list[i].main.humidity + "%",
						pressure: data.list[i].main.pressure + " hPa",
						clouds: data.list[i].clouds.all + "%",
						icon: "https://openweathermap.org/img/wn/" +data.list[i].weather[0].icon+ "@2x.png"
					}
					tHF.push(forecast)
				}
				this.setState({threeHourForecasts: tHF})
				console.log(this.state.threeHourForecasts)

				let fDF = [];
				for (let i = 7; i < 40; i += 8){
					let parsedApiTime = this.convertTimeZone(data.list[i].dt, this.state.timezone);
					let forecast = {
						
						loc: this.state.location,
						date: new Date(data.list[i].dt_txt).toLocaleDateString(),
						time: parsedApiTime,
						temp: data.list[i].main.temp + " °C",
						cond: data.list[i].weather[0].description,
						windSp: data.list[i].wind.speed + " m/s",
						windDir: data.list[i].wind.deg + "°",
						humidity: data.list[i].main.humidity + "%",
						pressure: data.list[i].main.pressure + " hPa",
						clouds: data.list[i].clouds.all + "%",
						icon: "https://openweathermap.org/img/wn/" +data.list[i].weather[0].icon+ "@2x.png"
					}
					fDF.push(forecast)
				}
				this.setState({fiveDayForecasts: fDF})
				console.log(this.state.fiveDayForecasts)

				let allF = [];
				for (let i = 0; i < data.list.length; i++){
					let parsedApiTime = this.convertTimeZone(data.list[i].dt, this.state.timezone);
					let forecast = {
						loc: this.state.location,
						date: new Date(data.list[i].dt_txt).toLocaleDateString(),
						time: parsedApiTime,
						temp: data.list[i].main.temp,
						windSp: data.list[i].wind.speed,
						humidity: data.list[i].main.humidity,
						pressure: data.list[i].main.pressure,
					}
					allF.push(forecast)
				}
				this.setState({allForecasts: allF})
				console.log(this.state.allForecasts)
				this.safetyCheck();
			}
		})
		
	}

	// function to fetch location, temperature and weather conditions from openweathermap API
	getURL() {
		let url = `https://api.openweathermap.org/data/2.5/weather?appid=b406cf8ad004accec63c04f51a061e82&units=metric`;
		let forecasturl = `https://api.openweathermap.org/data/2.5/forecast?appid=b406cf8ad004accec63c04f51a061e82&units=metric`;
		if (this.state.locationUsed == "current"){
			if (window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(		
					(position) => {
						if (position != null){
							url += `&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
							forecasturl += `&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
							this.readFromAPI(url);
							this.readFromAPIforecast(forecasturl);

						} else {console.log("position is null")}
						
					} ,(e) => {	
						console.log("geolocation error: ", e);
					}
				);
			} else {
				console.log("navigator not supported");
			}
		} else if (this.state.airports.has(this.state.locationUsed)) {
			url += `&lat=${this.state.latitude}&lon=${this.state.longitude}`
			forecasturl += `&lat=${this.state.latitude}&lon=${this.state.longitude}`
			this.readFromAPI(url);
			this.readFromAPIforecast(forecasturl);
		} else {
			url += `&q=${this.state.locationUsed}`
			forecasturl += `&q=${this.state.locationUsed}`
			this.readFromAPI(url);
			this.readFromAPIforecast(forecasturl);
		}
	}	

	safetyCheck() {
        console.log("in safetyCheck")
        let dangerMessage = "";
        let moreThanOneDanger = false; // for appending commas in danger message if needed
        let nextSafeTime = "";

		let temp;
		let pressure;
		let humidity;
		let wind;

		console.log("forecastUsed: ", this.state.forecastUsed != null)

		if (this.state.forecastUsed != null){
			temp = this.state.forecastUsed.temp;
			pressure = this.state.forecastUsed.pressure;
			humidity = this.state.forecastUsed.humidity;
			wind = this.state.forecastUsed.windSp;
		} else {
			temp = this.state.temp;
			pressure = this.state.pressure;
			humidity = this.state.humidity;
			wind = this.state.windSp;
		}

		console.log("inside safetyCheck: " + temp + " " + pressure + " " + humidity + " " + wind)

        // dangerous weather conditions that stop flight take off
        let maxTemp = 47
        let minPressure = 950
        let maxHumidity = 95
        let maxWind = 34
        // let maxTemp = 1
        // let minPressure = 10000
        // let maxHumidity = 1
        // let maxWind = 1

        if(parseFloat(temp) > maxTemp){
            if (moreThanOneDanger){
                dangerMessage += " | "
            }
            dangerMessage += "High Temperature: " + temp
            moreThanOneDanger = true
        }
        if(parseFloat(pressure) < minPressure){
            if (moreThanOneDanger){
                dangerMessage += " | "
            }
            dangerMessage += "Low Pressure: " + pressure
            moreThanOneDanger = true

        }
        if(parseFloat(humidity) > maxHumidity){
            if (moreThanOneDanger){
                dangerMessage += " | "
            }
            dangerMessage += "High Humidity Level: " + humidity
            moreThanOneDanger = true

        }
        if(parseFloat(wind) > maxWind){
            if (moreThanOneDanger){
                dangerMessage += " | "
            }
            dangerMessage += "High Wind Speeds: " + wind
            moreThanOneDanger = true
        }

        if(dangerMessage == ""){
            this.setState({
                danger: false,
                headerMessage: "No Hazards: Safe to Fly"
            })
        } else {
            for (let i = 0; i < this.state.allForecasts.length; i++) {
                const forecast = this.state.allForecasts[i];
                const forecastTemperature = forecast.temp;
                const forecastAirPressure = forecast.pressure;
                const forecastHumidity = forecast.humidity;
                const forecastWindSpeed = forecast.windSp;
                const forecastTime = forecast.time;

                console.log("Forecast: " + forecastTemperature + forecastAirPressure + forecastHumidity + forecastWindSpeed + forecastTime)


                if(forecastTemperature < 47 && forecastAirPressure > 950 && forecastHumidity < 95 && forecastWindSpeed < 34) {
                    nextSafeTime = forecastTime
                    break;
                }
            }
            this.setState({
                danger: true,
                headerMessage: "NOT SAFE TO FLY: " + dangerMessage + " | Safe to Fly at Approx: " + nextSafeTime
            })
        } 
    }

	handleLocationChange = (event) => {
		var selectedValue = event.target.value;
		this.setState({locationUsed: selectedValue});
		if (this.state.airports.has(selectedValue.toUpperCase())){
			this.setState({locationUsed: selectedValue.toUpperCase()});
			console.log(selectedValue)
			this.setCoords();
		}
		this.setState({forecastUsed: null});
		this.getURL();
	};

	// sets the forecast to be displayed. called upon the click of any box in the 3hr or 5day forecasts
	setForecast = (forecast) => {
		if (this.state.forecastUsed == forecast){
			this.setState({forecastUsed: null});
		} else {
			this.setState({forecastUsed: forecast});
		}
	}

	// parse airports.csv file into hash table
	parseAirports = () => {
		console.log("parsing airports")
		var airports = new Map();
		$.ajax({
			type: "GET",
			url: "./components/ipad/airports.csv",
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

	componentDidMount() {
		this.parseAirports();
		this.getURL();
	}


	// the main render method for the ipad component
	render() { 

		// check if forecastUsed isn't null, if so render the forecast page
		if (this.state.forecastUsed != null){

			console.log(this.state.forecastUsed.date, this.state.forecastUsed.time)

			return (
				<div class={style.container}>
					<Header 
						temp = {this.state.forecastUsed.temp}
						clouds = {this.state.forecastUsed.clouds}
						pressure = {this.state.forecastUsed.pressure}
						humidity = {this.state.forecastUsed.humidity}
						wind = {this.state.forecastUsed.windSp}
						safetyCheck = {this.safetyCheck}
						forecasts = {this.state.allForecasts}
						message = {this.state.headerMessage}
						danger = {this.state.danger}
						// temp = {this.state.temp}
						// clouds = {this.state.clouds}
						// pressure = {this.state.pressure}
						// humidity = {this.state.humidity}
						// wind = {this.state.windSp}
						// forecasts = {this.state.allForecasts}
					/>
					<Section1 
						handleChange = {this.handleLocationChange}
						location = {this.state.loc} 
						temperature = {this.state.forecastUsed.temp}
						icon = {this.state.forecastUsed.icon}
						date = {this.state.forecastUsed.date}
						time = {this.state.forecastUsed.time}
					/>
					<Section2 
						clouds = {this.state.forecastUsed.clouds}
						pressure = {this.state.forecastUsed.pressure}
						humidity = {this.state.forecastUsed.humidity}
						wind = {this.state.forecastUsed.windSp}
						windDir = {this.state.forecastUsed.windDir}
					/>
					<Forecasts 
						title = "18-hour Forecast"
						forecasts = {this.state.threeHourForecasts}
						selected = {this.state.forecastUsed}
						handleClick = {this.setForecast}
						
					/>
					<Forecasts 
						title = "5-day Forecast"
						forecasts = {this.state.fiveDayForecasts}
						selected = {this.state.forecastUsed}
						handleClick = {this.setForecast}
					/>
				</div>
			);
		}

		

		// check if all data is fetched, if so render the main page (display current weather data)
		if (this.state.fiveDayForecasts.length == 5 && this.state.threeHourForecasts.length == 5 && this.state.allForecasts != 0){
			console.log("render main page")
			
			return (
				<div class={style.container}>
					<Header 
						temp = {this.state.temp}
						clouds = {this.state.clouds}
						pressure = {this.state.pressure}
						humidity = {this.state.humidity}
						wind = {this.state.windSp}
						safetyCheck = {this.safetyCheck}
						forecasts = {this.state.allForecasts}
						message = {this.state.headerMessage}
						danger = {this.state.danger}
						
					/>
					<Section1 
						handleChange = {this.handleLocationChange}
						location = {this.state.loc} 
						temperature = {this.state.temp}
						icon = {this.state.icon}
						date = {this.state.date}
						time = {this.state.time}
					/>
					<Section2 
						clouds = {this.state.clouds}
						pressure = {this.state.pressure}
						humidity = {this.state.humidity}
						wind = {this.state.windSp}
						windDir = {this.state.windDir}
					/>
					<Forecasts 
						title = "18-hour Forecast"
						forecasts = {this.state.threeHourForecasts}
						selected = {this.state.forecastUsed}
						handleClick = {this.setForecast}
						
					/>
					<Forecasts 
						title = "5-day Forecast"
						forecasts = {this.state.fiveDayForecasts}
						selected = {this.state.forecastUsed}
						handleClick = {this.setForecast}
					/>
				</div>
			);
		}
	}

}

{/* // "coord":{"lon":-0.1257,"lat":51.5085},
// 	"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
// 	"base":"stations",
// 	"main":{"temp":8.4,"feels_like":5.74,"temp_min":7.35,"temp_max":9.82,"pressure":1015,"humidity":61},
// 	"visibility":10000,
// 	"wind":{"speed":4.63,"deg":170},
// 	"clouds":{"all":100},
// 	"dt":1678885703,
// 	"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1678860938,"sunset":1678903415},
// 	"timezone":0,
// 	"id":2643743,
// 	"name":"London",
// 	"cod":200 */}
