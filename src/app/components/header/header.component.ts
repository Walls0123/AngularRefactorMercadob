import { Component, OnInit } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getCurrentLocation() {
    if ("geolocation" in navigator) {
      /* la geolocalización está disponible */
      navigator.geolocation.getCurrentPosition((position) => {
        //Cambiar la localizcion... Cambiar de lugar
        console.log(position)
        let divs: HTMLDivElement = document.createElement("div");
        var placesService = new google.maps.places.PlacesService(divs)

        var locations: LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        placesService.nearbySearch({
          location: locations,
          radius: 90000,
          types: ["locality"]
        }, (result, status) => {
          console.log(result)
        })

      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            $('#modalerror').modal('show');
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location position unavailable.");
            break;
          case error.TIMEOUT:
            alert("Request timeout.");
            break;
        }
      }, { timeout: 1000, enableHighAccuracy: true });
    } else {
      $('#modalerror').modal('show');
      /* la geolocalización NO está disponible */
    }
  }
  buscarlocation() {
    this.getCurrentLocation()
  }
}
