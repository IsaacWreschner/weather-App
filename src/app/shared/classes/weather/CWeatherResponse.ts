import { TWeatherInfo } from "../../types/weather/TWeatherInfo";
import { AHttpResponse } from "../AResponse";


export class CWeatherResponse extends AHttpResponse<TWeatherInfo>{
    isResLegal(response:TWeatherInfo){
      return true;
    }
}