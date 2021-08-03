import { HttpResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import { TLocation } from '../shared/types/location/TLocation';

declare const google: any;
@Directive({
  selector: '[appGoogleAutocomplete]'
})
export class GoogleAutocompleteDirective {

  @Output()btLocationChanges = new EventEmitter();
  
  location:TLocation;
  googleAutoComplete:any;
  googleACStatus:'none'|'mounted'|'not-mounted';
  interval:any;
  input:HTMLInputElement;
  constructor(private http:HttpService,
              private ngZone:NgZone,
              private el: ElementRef) { 
                this.input = el.nativeElement;
              }

 ngOnInit() {
    this._initializeGoogle();
    
 }

 ngOnDestroy(){
    clearInterval(this.interval);
 }

 private _initializeGoogle = () => {
    setTimeout(()=> {
      this.http.isGoogleInitialized.subscribe(is => {
        if(is && this.googleACStatus !== 'mounted'){
          this._bindGoogleACToInput()
          this._listenToChanges();
          this.googleACStatus = 'mounted';
        }
      })
      },300)
 }


 private _listenToChanges = () => {
   this.interval = setInterval(()=> {
   let places = this.googleAutoComplete.getPlace()
     if(places && places.formatted_address){ //check that the object is from google
       this.location = this._pipeGoogleRes(places);
       //To allow angular automatic detect changes in parent's html template.
       this.ngZone.run(()=>{
         this.btLocationChanges.emit(this.location);
       })
       this._resetGoogleAC();
     }
   },1000)
 }


 private _pipeGoogleRes = (places:any):TLocation => {
       let location:any = {};
       location.lat = places.geometry.location.lat();
       location.lng = places.geometry.location.lng();
       location.placeId = places.place_id;
       location.placeName = places.formatted_address;
       if(places.vicinity)
         location.city = places.vicinity;
       this._resetGoogleAC();
       return location;
 }

 private _resetGoogleAC(){
   this._bindGoogleACToInput()
 }

 private _bindGoogleACToInput = ():void => {
   var options = {
      strictBounds: true,
      types: ['geocode'],
     };
    this.googleAutoComplete = new google.maps.places.Autocomplete(this.input, options);
 }
}
