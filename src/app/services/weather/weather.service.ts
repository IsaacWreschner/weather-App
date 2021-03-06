import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CWeatherResponse } from '../../shared/classes/weather/CWeatherResponse';
import { TWeatherInfo } from '../../shared/types/weather/TWeatherInfo';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherResponse:CWeatherResponse = new CWeatherResponse();
  /** for the LS because we need to store celsius 
  additionalResponseForCelsius:CWeatherResponse = new CWeatherResponse();*/
  constructor(private httpService:HttpService) { }

  getWeatherByCoordinates(
            lat:number,
            lng:number,
            unit?:'Fahrenheit'|'Celsius'
          ){
            this.weatherResponse.setStatus('fetching');
            this.httpService.getWeatherByCoordinates(lat,lng,this._getUnitNameForApi(unit))
               .subscribe(
                  res =>{
                     this.weatherResponse.setResponse(<TWeatherInfo>res)
                  },
                  err => {
                     console.log(err)
                     this.weatherResponse.setError(err);
                  }
               )
            }


    private _getUnitNameForApi(unit:'Fahrenheit'|'Celsius'){
       if(!unit || unit === 'Celsius') return 'Metric';
       return 'Imperial';
    }
}
