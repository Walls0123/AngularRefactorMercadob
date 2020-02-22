import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address'
import { Router } from '@angular/router';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons'
import { SizeProp, IconProp } from '@fortawesome/fontawesome-svg-core';
import { MapsAPILoader } from '@agm/core'
import 'jquery'
import { SeacrchService } from 'src/app/services/seacrch.service';
import { MetacolorService } from 'src/app/services/metacolor.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private colometa: MetacolorService, private router: Router, private mapsApiloader: MapsAPILoader, private ngZone: NgZone, private searchservice: SeacrchService) {
    let color = '#FF6C2F';
    this.colometa.changeThemeColorUsingMeta(color);
  }
  name = 'Angular';

  ngOnInit() {
    $('.modal-backdrop').remove()
    $('#exampleModalPreview').modal().hide()
    $('#busqueda').focus(() => {
      $('#errorcar').hide(2000)
      this.smserror = false
    }
    )
    $('#btnclosemodal').click(() => {
      $('#busqueda').val('')
    })

  }
  options = {
    componentRestrictions: {
      country: ['PE']
    }
  }
  fase: Array<Icons> = [{
    i: faSearch,
    sise: "5x",
    text: "Busca y selecciona una bodega",
    paso:"Paso 1"
  },
  {
    i: faTicketAlt,
    sise: "5x",
    text: "Reserva gratis en línea",
    paso:"Paso 2"
  },
  {
    i: faWarehouse,
    sise: "5x",
    text: "Visita la bodega",
    paso:"Paso 3"
  },
  {
    i: faPeopleCarry,
    sise: "5x",
    text: "BLleva tus cosas",
    paso:"Paso 4"
  }]
  smserror: boolean = false;
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // let input: HTMLInputElement = <HTMLInputElement>document.getElementById('busqueda');
    // let autocomplete=new google.maps.places.Autocomplete(input);
    // autocomplete.addListener('place_changed',function(){
    //   let place=autocomplete.getPlace();
    //   console.log('eventadadasd')
    //   console.log(place)
    // })
  }
  onclick() {
    if ($('#busqueda').val().toString().length < 4) {
      this.smserror = true;
    } else {
      this.mapsApiloader.load().then(() => {
        let input: HTMLInputElement = <HTMLInputElement>document.getElementById('busqueda');
        let auto = new google.maps.places.AutocompleteService();

        let autocomplete = new google.maps.places.AutocompleteService();
        autocomplete.getPlacePredictions(
          {
            input: input.value,
            componentRestrictions: { country: 'PE' }
          },
          (pre, status) => {
            console.log(pre)
            if (status.toString() == 'OK') {
              for (let index = 0; index < pre.length; index++) {
                const element = pre[index];
                if (element.types.includes('locality')) {
                  this.sendLocationSearch(element)
                  break;
                }
                if (element.types.includes("administrative_area_level_1")) {
                  this.sendLocationSearch(element)
                  break;
                }
                if (element.types.includes('administrative_area_level_3')) {
                  this.sendLocationSearch(element)
                  break;
                }
              }
            }
            else {
              $('#myModal').modal('show')
            }
          })
      })
    }

  }
  getCurrentLocation() {
    if ("geolocation" in navigator) {
      /* la geolocalización está disponible */
      navigator.geolocation.getCurrentPosition((position)=>{
        //Cambiar la localizcion... Cambiar de lugar
      }, (error)=>{
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
  sendLocationSearch(object: google.maps.places.AutocompletePrediction) {
    this.searchsites.pop()
    let div: HTMLDivElement = <HTMLDivElement>document.getElementById('inputbuscador')
    var placesService = new google.maps.places.PlacesService(div)
    placesService.getDetails({
      placeId: object.place_id
    }, (place, status) => {
      console.log(place)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        place.address_components.forEach(element => {
          this.searchsites.push(element.long_name)
        });
        this.searchsites.reverse();
        this.searchsites.unshift('search')
        if (this.searchsites.length <= 4) {
          this.searchservice.setObjectSearching(place);
          this.router.navigate(this.searchsites);
        } else {
          this.searchservice.setObjectSearching(place);
          this.searchsites.splice(3, 2)
          this.router.navigate(this.searchsites);
        }
      }
    })
  }
  searchsites: Array<string> = ['search'];
  public handleAddressChange(address: Address) {
    this.searchsites.pop();
    address.address_components.forEach(element => {
      this.searchsites.push(element.long_name)
    });
    this.searchsites.reverse();
    this.searchsites.unshift('search');
    console.log(this.searchsites)
    if (this.searchsites.length >= 5) {
      this.searchservice.setObjectSearching(<google.maps.places.PlaceResult>(address));
      this.router.navigate(this.searchsites);
    }
    else {
      this.searchservice.setObjectSearching(<google.maps.places.PlaceResult>(address));
      this.router.navigate(this.searchsites);
    }

  }
}
export interface Icons {
  i: IconProp,
  sise: SizeProp,
  text: String,
  paso:String
}
