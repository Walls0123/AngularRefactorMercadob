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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private mapsApiloader: MapsAPILoader, private ngZone: NgZone,private searchservice:SeacrchService) { }
  ngOnInit() {

    $('#busqueda').focus(()=>{
      $('#errorcar').hide(2000)
      this.smserror=false
    }
    )
    $('#btnclosemodal').click(()=>{
      $('#busqueda').val('')
    })

  }
  options = {
    componentRestrictions: {
      country: ['CL']
    }
  }
  fase: Array<Icons> = [{
    i: faSearch,
    sise: "5x",
    text: "Busca y selecciona una bodega"
  },
  {
    i: faTicketAlt,
    sise: "5x",
    text: "Reserva gratis en línea"
  },
  {
    i: faWarehouse,
    sise: "5x",
    text: "Visita la bodega"
  },
  {
    i: faPeopleCarry,
    sise: "5x",
    text: "BLleva tus cosas"
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
    if ($('#busqueda').val().toString().length< 4) {
      this.smserror = true;
    } else {
      this.mapsApiloader.load().then(() => {
        let input: HTMLInputElement = <HTMLInputElement>document.getElementById('busqueda');
        let auto=new google.maps.places.AutocompleteService();

        let autocomplete = new google.maps.places.AutocompleteService();
        autocomplete.getPlacePredictions(
          {
            input: input.value,
            componentRestrictions: { country: 'cl' }
          },
          (pre, status)=> {
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
            else{
              $('#myModal').modal('show')
            }
          })
      })
    }

  }
  sendLocationSearch(object:google.maps.places.AutocompletePrediction){
    this.searchsites.pop()
    let div:HTMLDivElement=<HTMLDivElement>document.getElementById('inputbuscador')
    var placesService = new google.maps.places.PlacesService(div)
    placesService.getDetails({
      placeId:object.place_id
    },(place,status) =>{
      if (status===google.maps.places.PlacesServiceStatus.OK) {
        place.address_components.forEach(element => {
          this.searchsites.push(element.long_name)
        });
        this.searchsites.reverse();
        this.searchsites.unshift('search')
        if (this.searchsites.length<=4) {
          this.searchservice.setObjectSearching(place);
          this.router.navigate(this.searchsites);
        }else{
          this.searchservice.setObjectSearching(place);
          this.searchsites.splice(3,2)
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
    console.log(address);
    this.searchsites.reverse();
    this.searchsites.unshift('search')
    if (this.searchsites.length<=4) {
      this.searchservice.setObjectSearching(<google.maps.places.PlaceResult>(address));
      this.router.navigate(this.searchsites);
    }else{
      this.searchservice.setObjectSearching(<google.maps.places.PlaceResult>(address));
      this.searchsites.splice(3,2)
      this.router.navigate(this.searchsites);
    }

  }
}
export interface Icons {
  i: IconProp,
  sise: SizeProp,
  text: String
}
