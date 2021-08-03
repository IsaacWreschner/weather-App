import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '../http/http.service';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService,HttpClient,HttpHandler]
    });
    service = TestBed.inject(WeatherService);
  });
  /**
   * 
   * UNIT TEST
   * 
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should function _getUnitNameForApi(unit:'Fahrenheit'|'Celsius') behaves correctly `,()=>{
    expect((service as any)._getUnitNameForApi('Fahrenheit')).toEqual('Imperial')
    expect((service as any)._getUnitNameForApi('Celsius')).toEqual('Metric')
    expect((service as any)._getUnitNameForApi(null)).toEqual('Metric')
  })

  /**
   * 
   * INTEGRATIONS TEST (deep)
   * 
   */
   it(`should any call to getWeatherByCoordinates() trigger a http request`,()=>{
    
  })
});
