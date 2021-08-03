import { TestBed } from "@angular/core/testing";
import { CWeatherResponse } from "./CWeatherResponse";

describe('Weather response', () => {
  let _class: CWeatherResponse;
  
  beforeEach(() => {
    _class = new CWeatherResponse();
  });

  it('should be created', () => {
    expect(_class).toBeTruthy();
  });

  it('testing status legal according to different weather responses scenarios', () => {
    let mockedResponse = mockResponse();
    function setResponseForTest(prop:'coord'|'temp'|'dt'|'name'|'main',value:any){
       if(prop === 'temp'){
         mockedResponse.main.temp = value;
       } else {
        (<any>mockedResponse[prop]) = value;
       }
         _class.setResponse(mockedResponse);
    }
    setResponseForTest('temp',null)
    expect(_class.getStatus()).toEqual('illegal');
    setResponseForTest('temp',"52")
    expect(_class.getStatus()).toEqual('illegal');
    setResponseForTest('main',null)
    expect(_class.getStatus()).toEqual('illegal');
    setResponseForTest('main',{temp:-265})
    expect(_class.getStatus()).toEqual('success');
    setResponseForTest('name',undefined)
    expect(_class.getStatus()).toEqual('success');
    setResponseForTest('coord',{lat:0,lon:0})
    expect(_class.getStatus()).toEqual('success');
    setResponseForTest('dt',0)
    expect(_class.getStatus()).toEqual('illegal');
  });

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