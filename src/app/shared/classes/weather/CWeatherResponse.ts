import { TWeatherInfo } from "../../types/weather/TWeatherInfo";
import { AHttpResponse } from "../AResponse";


export class CWeatherResponse extends AHttpResponse<TWeatherInfo>{
    isResLegal(response:TWeatherInfo){
      if(response 
        && response.coord 
        && typeof response.coord.lat === 'number'
        && typeof response.coord.lon === 'number'
        && response.main
        && typeof response.main.temp === 'number'
        && response.dt && typeof response.dt === 'number'
        ) return true;
      return false;
    }
   
}