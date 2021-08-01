import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import { CWeatherResponse } from '../../shared/classes/weather/CWeatherResponse';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  weatherResponse = new CWeatherResponse();
  subscriptions:Subscription[] = [];
  constructor(private weatherService:WeatherService) { }

  ngOnInit(): void {
    this._subscribeToService();
    this.weatherService.getWeatherByCoordinates(25,32,'Celsius');
  }

  ngOnDestroy(){
      this.subscriptions.map(sub =>{
        sub.unsubscribe();
      })
  }

  private _subscribeToService(){
    this.subscriptions[0] = this.weatherService.weatherResponse.subscribe(res => {
      this.weatherResponse = res;
    })
  }

  private _checkUserLocation(){
      navigator.geolocation.getCurrentPosition(
         res => {

        },err => {

        }
      )
  }

}
