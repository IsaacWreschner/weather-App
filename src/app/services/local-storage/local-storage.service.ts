import { Injectable } from '@angular/core';


interface ILocalStorageItem{
  item:any,
  timeStamp:number
}

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
   
  constructor() { 
    //this.deleteOutdateds();
   }

  get = (objectName:string):any => {
    let ret = null;
    try{
       ret =  <ILocalStorageItem> 
       JSON.parse(window.localStorage.getItem(objectName))
    } catch {
      return ret;
    }
    if(ret)
       return ret.item;
    return ret;
  } 

  set = (objectName:string,object:any):any => {
    let date = new Date()
    let nItem:ILocalStorageItem = {
      item:object,
      timeStamp:date.getTime()
    }
    return window.localStorage.setItem(objectName,JSON.stringify(nItem));
  }

  has = (className:string):boolean => {
    return true;
  }

  delete = (objectName:string):void => {
    window.localStorage.removeItem(objectName);
  }

  deleteOutdateds = ():void => {
    // let date = new Date();
    // let currTime = date.getTime();
    // this.getKeys().map(key => {
    //   let value = this._get(key);
    //   if(value){
    //     let timeStamp = value.timeStamp;
    //     let timePassed = currTime - timeStamp;
    //     if(timePassed > environment.localStorageExpireTime){
    //       this.delete(key)
    //     }
    //   }
    //  })
  }

  getAll = ():any => {
    let arr = []
      this.getKeys().map(key => {
         arr.push({key:key,item:this.get(key)})
      })
      return arr;
  }

  getKeys = ():string[] => {
    let arr:string [] = [];
    Array.from({length: window.localStorage.length}, (x,i) => i).map(i => {
        arr.push(window.localStorage.key(i))
    })
     return arr;
  }
  deleteAll = () => {
    window.localStorage.clear();
  }

  private _get = (objectName:string):any => {
    let ret;
    try{
       ret = <ILocalStorageItem> 
      JSON.parse(window.localStorage.getItem(objectName))
       } catch(e){
     }
     return ret;
  } 
}
