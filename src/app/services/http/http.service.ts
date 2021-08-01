import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';


const WEATHER_API_KEY = `1b2c7cf7ec395ecdf1b4ad785ed3c181`;
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getWeather(lat:number,lng:number,unit:'Metric'|'Imperial' = 'Metric'){
     return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${unit}&appid=${WEATHER_API_KEY}`)
  }
}
