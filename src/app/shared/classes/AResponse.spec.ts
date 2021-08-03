import { TestBed } from "@angular/core/testing";
import { AHttpResponse } from "./AResponse";


describe('base http response class', () => {
  let _class: AHttpResponse<any>;
  
  beforeEach(() => {
      class CHttpResponse extends AHttpResponse<any>{
          isResLegal(){return true}
      }
    _class = new CHttpResponse();
  });

  it('should be created', () => {
    expect(_class).toBeTruthy();
  });

  it(`should have 'none' status by default`, () => {
    expect(_class.getStatus()).toEqual('none');
  });

  it(`should have 'fetching' status when set status 'fetching'`, () => {
    _class.setStatus('fetching')
    expect(_class.getStatus()).toEqual('fetching');
  });

  it(`should have 'success' status when set response({msg:'allrights'})`, () => {
      _class.setResponse({msg:'allrights'})
    expect(_class.getStatus()).toEqual('success');
  });

  it(`should getResponse() returns {msg:'allrights'} when set response({msg:'allrights'})`, () => {
    _class.setResponse({msg:'allrights'})
    expect(_class.getResponse()).toEqual({msg:'allrights'});
  });

  it(`should have 'error' status when set error({msg:'fatal'})`, () => {
    _class.setError({msg:'fatal'})
  expect(_class.getStatus()).toEqual('httpError');
});

  it(`should Error returns {msg:'fatal'} when set error({msg:'fatal'})`, () => {
    _class.setError({msg:'fatal'})
    expect(_class.getError()).toEqual({msg:'fatal'});
  });
});