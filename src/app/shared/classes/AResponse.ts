import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Subscription } from "rxjs";

type TResponseStatus = 'none'|'fetching'|'httpError'|'illegal'|'success';

export abstract class AHttpResponse<TResponse extends object>{
    private status:BehaviorSubject<TResponseStatus> = 
        new BehaviorSubject(null);
    private error:any;
    private response:TResponse;
    abstract isResLegal(response:TResponse):boolean;
    constructor(){
        this.status.next('none');
    }

   
    
    subscribe(callback:CallableFunction):Subscription{
        return this.status.subscribe(() => callback(this))
    }

    getStatus(){
        return this.status.value;
    }

    setStatus(status:TResponseStatus){
      this.status.next(status);
      return this;
    }

    setResponse(res:TResponse){
       let isResLegal = this.isResLegal(res);
       if(!isResLegal){
        this.setStatus('illegal');
        return this;
       }
        this.response = res;
        this.setStatus('success');
        return this;
    }

    setError(err){
      this.setStatus('httpError');
      this.error = err;
      return this;
    }

    getError(){
        if(this.status.value !== 'httpError') 
           return null;
        return this.error;
    }

    getResponse(){
        if(this.status.value !== 'success') 
           return null;
        return this.response;
     }
}