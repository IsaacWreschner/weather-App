import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() =>{
    TestBed.configureTestingModule({})
    service = TestBed.get(LocalStorageService)
  } );
  let service: LocalStorageService;
  it('should be created', () => {
    
    expect(service).toBeTruthy();
  });

  it('should put to the LS',()=>{
    service.set('abc',{msg:'I want to be in the LS'})
    expect(service.get('abc')).toEqual({msg:'I want to be in the LS'})
  })

  it('should delete from the LS only by key',()=>{
    service.set('abc',{msg:'I want to be in the LS'})
    service.set('abcd',{msg:'I also want to be in the LS'})
    service.delete('abc')
    expect(service.get('abc')).toBeNull();
    expect(service.get('abcd')).toEqual({msg:'I also want to be in the LS'})
  })

  it('should delete from the LS all',()=>{
    service.set('abc',{msg:'I want to be in the LS'})
    service.set('abcd',{msg:'I also want to be in the LS'})
    service.deleteAll()
    expect(service.get('abc')).toBeNull();
    expect(service.get('abcd')).toBeNull();
    service.deleteAll()
  })

  it('should get all from LS',()=>{
    service.deleteAll()
    service.set('abc',{msg:'I want to be in the LS'})
    service.set('abcd',{msg:'I also want to be in the LS'})
    console.log()
    expect(service.getAll()).toEqual(
      [{key:'abc',item:{msg:'I want to be in the LS'}},
       {key:'abcd',item:{msg:'I also want to be in the LS'}}]
    );
  })

  it('should get all keys from LS',()=>{
    service.deleteAll()
    service.set('abc',{msg:'I want to be in the LS'})
    service.set('abcd',{msg:'I also want to be in the LS'})
    console.log()
    expect(service.getKeys()).toEqual(
      ['abc','abcd']
    );
  })
});
