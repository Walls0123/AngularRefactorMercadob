import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeacrchService {

  constructor() { }
  isRoutingSearching:boolean=false;
  placeobject:google.maps.places.PlaceResult
  setPlaceIDSearch(placeID:string){
    this.isRoutingSearching=true
  }
  getPlaceIDSearch():string{
    return ''
  }

  //Object
  setObjectSearching(place:google.maps.places.PlaceResult){
    this.isRoutingSearching=true
    this.placeobject=place;
  }
  getObjectSearching():google.maps.places.PlaceResult{
    return this.placeobject;
  }
}
