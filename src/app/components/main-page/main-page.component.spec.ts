import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpService } from '../../services/http/http.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { WeatherService } from '../../services/weather/weather.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageComponent,NavBarComponent],
      imports:[],
      providers:[WeatherService,HttpClient,HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**
   * 
   * UNIT TEST
   * 
   */
   it(`at setup, weather response status should be 'none'`, () => {
    expect(component.weatherResponse.getStatus()).toEqual('none');
  });

  

  it('should subscribe to services on Init',()=> {
    //spyOn(component,"_subscribeToService");
    component.ngOnInit();
    expect(component.subscriptions.length).toBeGreaterThanOrEqual(1);
  })

  it('should call to  _getCurrentLocationAndFetch() function on Init',()=> {
    spyOn((fixture.componentInstance as any),"_getCurrentLocationAndFetch").and.callThrough();
    component.ngOnInit();
    expect((component as any)._getCurrentLocationAndFetch).toHaveBeenCalled();
  })



  it('should destroy all subscriptions on Destroy',()=> {
    component.ngOnDestroy();
    let subsClosed = 0;
    component.subscriptions.map(sub => {
      subsClosed = (sub.closed)?(subsClosed+1):(subsClosed)
    })
    expect(component.subscriptions.length).toEqual(subsClosed);
  })

  it(`geolocation status should always be 'no-need' when onSearchLocation() is called`,()=> {
    component.onSearchLocation(<any>{})
    expect(component.geoLocation.status).toEqual('no-need'); 
  })

  /**
   * 
   * INTEGRATIONS test (shallow)
   * 
   */
   it('should show  relevant message when getting geolocation from browser ',()=> {
    (component as any)._getCurrentLocationAndFetch();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#fetching-loc-from-navigator').textContent).toBeTruthy();
   })

  it('should show error message when http error or invalid',()=> {
     component.weatherResponse.setError(null);
     fixture.detectChanges();
     let compiled = fixture.debugElement.nativeElement;
     expect(compiled.querySelector('#error-result')).toBeTruthy();
     component.weatherResponse.setResponse(<any>{});//invalid
     fixture.detectChanges();
     compiled = fixture.debugElement.nativeElement;
     console.log(component.weatherResponse.getStatus())
     expect(compiled.querySelector('#error-result')).toBeTruthy();
  })

  it('testing the view according to different weather responses scenarios',()=>{
    let mockedResponse = mockResponse();
    function setResponseForTest(prop:'coord'|'temp'|'dt'|'name',value:any){
       if(prop === 'temp'){
         mockedResponse.main.temp = value;
       } else {
        (<any>mockedResponse[prop]) = value;
       }
         component.weatherResponse.setResponse(mockedResponse);
    }

    function expectView(lat,lng,date,time,icon:'sunny'|'snow'|'cloud',placeName){
      component.geoLocation.status = 'got';
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#weather-location').textContent).toContain(`${lat}`);
      expect(compiled.querySelector('#weather-location').textContent).toContain(`${lng}`);
      expect(compiled.querySelector('#weather-location').textContent).toContain(`${placeName}`);
      expect(compiled.querySelector('#weather-datetime').textContent).toContain(`${date}`);
      expect(compiled.querySelector('#weather-datetime').textContent).toContain(`${time}`);
      switch(icon){
        case 'sunny':{expect(compiled.querySelector('#icon-sunny')).toBeTruthy();};break;
        case 'cloud':{expect(compiled.querySelector('#icon-cloud')).toBeTruthy();};break;
        case 'snow':{expect(compiled.querySelector('#icon-snow')).toBeTruthy();};break;
      }
    }

    function exceptNoView(){
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#weather-location')).toBeFalsy();
    }

    setResponseForTest('coord',{lon:25,lat:38});
    expectView(25,38,'02/14','01:31','sunny', 'תל אביב')
    setResponseForTest('temp',-0.1)
    setResponseForTest('name','מונטריאול')
    expectView(25,38,'02/14','01:31','snow', 'מונטריאול')
    setResponseForTest('temp',0.0)
    expectView(25,38,'02/14','01:31','snow', 'מונטריאול')
    setResponseForTest('temp',0.1)
    expectView(25,38,'02/14','01:31','snow', 'מונטריאול')
    setResponseForTest('dt',1627848949)
    setResponseForTest('temp',1.0)
    expectView(25,38,'08/01','23:15','cloud', 'מונטריאול')
    setResponseForTest('name','פריז')
    setResponseForTest('temp',13.9)
    expectView(25,38,'08/01','23:15','cloud', 'פריז')
    setResponseForTest('temp',14.0)
    setResponseForTest('temp',14.9)
    expectView(25,38,'08/01','23:15','cloud', 'פריז')
    setResponseForTest('name',null)
    expectView(25,38,'08/01','23:15','cloud', '')
    setResponseForTest('temp',89.0)
    expectView(25,38,'08/01','23:15','sunny', '')
    setResponseForTest('temp',null)
    exceptNoView();
   
  })

  it('degree symbol should be celsius by default',()=>{
    component.geoLocation.status = 'got';
    let response = mockResponse();
    component.weatherResponse.setResponse(response);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#unit-icon').textContent).toContain(
      '℃'
    );
   })

  it(`Degree symbol should be farenheit if weatherQuery.unit is 'Farenheit `,()=>{
    component.geoLocation.status = 'got';
    let response = mockResponse();
    component.weatherResponse.setResponse(response);
    component.currWeatherQuery.unit = 'Fahrenheit';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#unit-icon').textContent).toContain(
      '℉'
    );
  })


  it(`should call function 'fetch weather' if temp unit changes` ,()=>{
  /*spyOn(component, 'fetchWeather').and.callThrough();
  let options: DebugElement[] = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
  console.log(options)
  options[1].triggerEventHandler('change', { target: options[1].nativeElement });*/
  //expect(component.fetchWeather).toHaveBeenCalled();
  })

  it(`should call function 'fetch weather' when user search manually for other location` ,()=>{
    //expect(1).toEqual(0);
  })

  
  it('should show  relevant message when fetching weather',()=> {
    component.weatherResponse.setStatus('fetching');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //if(component)
    expect(compiled.querySelector('#fetching-weather')).toBeTruthy();
  })

  /**
   * 
   * INTEGRATIONS TEST (deep)
   * 
   */
  
   it('should put in the LS when response received',()=> {
      let mocked = mockResponse();
      component.weatherResponse.setResponse(mocked);
      let LSservice:LocalStorageService = TestBed.inject(LocalStorageService)
      expect(LSservice.get(`search-${component.datetimeHumanized}-${mocked.name}`))
         .toEqual(mocked)
  }) 


  it(`should call weather service's 'getWeatherByCoordinates()' when fetch weather`,()=> {
    spyOn((component as any).weatherService,"getWeatherByCoordinates").and.callThrough();
    component.fetchWeather();
    expect((component as any).weatherService.getWeatherByCoordinates).toHaveBeenCalled();
  })
});


function mockResponse(){
  return   {
    coord:{lon:30,lat:30},
        base: null,
        main: {
          temp: 15.0,
        },
        dt:1234567895,
        name:'תל אביב'
  }
}