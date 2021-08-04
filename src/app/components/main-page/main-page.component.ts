import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import { CWeatherResponse } from '../../shared/classes/weather/CWeatherResponse';
import * as moment from 'moment';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { TLocation } from 'src/app/shared/types/location/TLocation';


type TWeatherQuery = {
  lat:number,
  lng:number,
  unit:'Celsius'|'Fahrenheit',
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  weatherResponse = new CWeatherResponse();
  subscriptions:Subscription[] = [];
  geoLocation:{
     status:'none'|'fetching-from-navigator'|'got'|'not-granted'|'no-need',
     messageFromBrowser?:string,
     coords?:{lat:number,lng:number}
    } = {status:'none'};
    currWeatherQuery:TWeatherQuery = 
      {
      lat:null,
      lng:null,
      unit:'Celsius',
      };
  datetimeHumanized:string;
  //tempUnit:'celsius'|'fahrenheit' = 'celsius';
  constructor(private weatherService:WeatherService,
             private LSservice:LocalStorageService) { }

  ngOnInit(): void {
    this._subscribeToService();
    this._getCurrentLocationAndFetch();
    
  }

  ngOnDestroy(){
      this.subscriptions.map(sub =>{
        sub.unsubscribe();
      })
  }

  public fetchWeather(){
    const {lat,lng,unit} = this.currWeatherQuery;
    this.weatherService.getWeatherByCoordinates(lat,lng,unit);
  }

  public onSearchLocation(location:TLocation){
    this.geoLocation.status = 'no-need';
    this.currWeatherQuery.lat = location.lat;
    this.currWeatherQuery.lng = location.lng;
    this.fetchWeather();
  }

  private _subscribeToService(){
    this.subscriptions[0] = this.weatherService.weatherResponse.subscribe(res => {
      this.weatherResponse = res;
      if(this.weatherResponse.getStatus() === 'success')
        this._onGetWeatherResponse();
      })
    }

  private _onGetWeatherResponse(){
    let res = this._clone(this.weatherResponse.getResponse()) //clone
    let unixTimeInMillsecs = new Date(res.dt * 1000)
    this.datetimeHumanized = moment(unixTimeInMillsecs)
      .format('HH:mm MM/DD');
    /**store always Celsius */
    if(this.currWeatherQuery.unit === 'Fahrenheit')
        res.main.temp = this._convertFahrenheitToCelsius(res.main.temp);
    this.LSservice.set(`search-${this.datetimeHumanized}-${res.name}`,res)
  }
  


  private _getCurrentLocationAndFetch(){
    this.geoLocation.status = 'fetching-from-navigator'
    navigator.geolocation.getCurrentPosition(
      res => {
        this.geoLocation.status = 'got';
        const {latitude,longitude} = res.coords;
        this.geoLocation.coords = { lat: latitude,lng: longitude}
        this.currWeatherQuery.lat = latitude;
        this.currWeatherQuery.lng = longitude;
        this.fetchWeather()
     },err => {
        this.geoLocation.status = 'not-granted';
        this.geoLocation.messageFromBrowser = err.message;
     }
   )
  }

  
  

  private _convertFahrenheitToCelsius(f:number){
    return ((f -32)*0.5556).toFixed(2);
  }
  
  private _clone(object){
    return JSON.parse(JSON.stringify(object))
  }

}
