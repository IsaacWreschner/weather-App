import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import { CWeatherResponse } from '../../shared/classes/weather/CWeatherResponse';
import * as moment from 'moment';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  weatherResponse = new CWeatherResponse();
  subscriptions:Subscription[] = [];
  geoLocation:{
     status:'none'|'enabled'|'disabled',
     messageFromBrowser?:string
    } = {status:'none'};
  dateTimeOnFetch:string;
  constructor(private weatherService:WeatherService,
             private LSservice:LocalStorageService) { }

  ngOnInit(): void {
    this._subscribeToService();
    this._fetchWeatherForCurrentLocation();
    
  }

  ngOnDestroy(){
      this.subscriptions.map(sub =>{
        sub.unsubscribe();
      })
  }

  private _subscribeToService(){
    this.subscriptions[0] = this.weatherService.weatherResponse.subscribe(res => {
      this.weatherResponse = res;
      if(this.weatherResponse.getStatus() === 'success'){
        let res = this.weatherResponse.getResponse()
          let unixTimeInMillsecs = new Date(res.dt * 1000)

          this.dateTimeOnFetch = moment(unixTimeInMillsecs)
            .format('MM/DD HH:mm');
          this.LSservice.set(`search-${this.dateTimeOnFetch}-${res.name}`,res)
      }
    })
  }

  private _fetchWeatherForCurrentLocation(){
    navigator.geolocation.getCurrentPosition(
      res => {
        this.geoLocation.status = 'enabled';
        let lat = res.coords.latitude;
        let lng = res.coords.longitude;
        this._fetchWeatherByCoordinates(lat,lng,'Celsius')
     },err => {
        this.geoLocation.status = 'disabled';
        this.geoLocation.messageFromBrowser = err.message;
     }
   )
  }

  private _fetchWeatherByCoordinates(lat,lng,unit){
    this.weatherService.getWeatherByCoordinates(lat,lng,unit);
  }

  

}
