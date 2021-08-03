import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const GOOGLE_MAPS_KEY = `AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw`
const WEATHER_API_KEY = `1b2c7cf7ec395ecdf1b4ad785ed3c181`;

declare global {
  interface Window {
    initMap:CallableFunction;
  }
 }

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  isGoogleInitialized:BehaviorSubject<boolean> = new BehaviorSubject(false); 
  constructor(private http:HttpClient) {
    this._fetchGoogleMapsModule()
   }
  
  private _fetchGoogleMapsModule(){
    var script = document.createElement('script');
    script.src =   `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&callback=initMap&libraries=places&language=iw`;
    script.defer = true;
    script.async = true;
    window.initMap = () => {
      this.isGoogleInitialized.next(true);
    }
    document.head.appendChild(script);
   }

  getWeatherByCoordinates(lat:number,lng:number,unit:'Metric'|'Imperial' = 'Metric'){
     return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${unit}&lang=he&appid=${WEATHER_API_KEY}`)
  }
}
