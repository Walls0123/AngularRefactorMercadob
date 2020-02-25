import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProccessdataService } from 'src/app/services/proccessdata.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader, AgmInfoWindow } from '@agm/core';
import { Geometry } from 'ngx-google-places-autocomplete/objects/geometry';
import { SeacrchService } from 'src/app/services/seacrch.service';
import 'jquery'
import { isEmpty } from 'rxjs/operators';
import { LocalsService } from 'src/app/services/locals.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //**!Close Agm */
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;
  mapClick($event) {
    if (this.previousIW) {
      this.previousIW.close();
    }
  }
  iconurl: string = "assets/bodega2.png"
  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
  }
  //**!Propeties */
  filter: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  currentPage: number = 1;
  //**?Cantidad de Locales
  isLocasAvabali = true;
  //**? FilterObject*/
  filters: FilterEntity[] = [
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_1.svg",
      nummteric: 2,
      longunid: 3,
      isHability: true,
      isChecked: false
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_2.svg",
      nummteric: 2,
      longunid: 5,
      isHability: true,
      isChecked: false
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_3.svg",
      nummteric: 2,
      longunid: 7,
      isHability: true,
      isChecked: false
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_4.svg",
      nummteric: 2,
      longunid: 10,
      isHability: true,
      isChecked: false
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_5.svg",
      nummteric: 2,
      longunid: 15,
      isHability: true,
      isChecked: false
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_6.svg",
      nummteric: 2,
      longunid: 20,
      isHability: true,
      isChecked: false
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_7.svg",
      nummteric: 2,
      longunid: 30,
      isHability: true,
      isChecked: false
    }]
  filtersforCaracteristics: FilterCaracteristicasEntity[] = [
    {
      id: 'fil1',
      nombre: 'Acceso 24 horas',
      state: false
    },
    {
      id: 'fil2',
      nombre: 'Primer Piso',
      state: false
    }
  ]
  urlicon: string = "https://es.seaicons.com/wp-content/uploads/2015/10/Warehouse-icon.png"
  textnext: string = 'Siguiente'
  textprevius: string = 'Anterior'
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private localsservice: LocalsService,
    private activatedRoute: ActivatedRoute,
    private procecesdataservice: ProccessdataService,
    private searchservice: SeacrchService,
    private spinnerService:NgxSpinnerService) {
    //Valid if Navigate is For Routing
    if (this.searchservice.isRoutingSearching) {
      console.log(this.activatedRoute.snapshot)
      let searchplace = this.searchservice.getObjectSearching();
      this.region = this.activatedRoute.snapshot.paramMap.get('region');
      this.pais = this.activatedRoute.snapshot.paramMap.get('pais');
      this.comuna = this.activatedRoute.snapshot.paramMap.get('comuna');
      //Consulta A la Base de Datos Si es Posible Para Filtrar
      this.activatedRoute.data.subscribe((data:
        { locals: LocalEntity[] }) => {
        console.log(data.locals)
        if (data.locals['status'] == 'ERROR') {
          this.locals = []
          this.procecesdataservice.setdataTransform(this.locals, <Address>(searchplace));
        }
        else {
          this.procecesdataservice.setdataTransform(data.locals, <Address>(searchplace));
        }
      });
    } else {
      let adr: Address
      this.activatedRoute.data.subscribe((data:
        { locals: LocalEntity[] }) => {
        console.log(data)
        if (data.locals['status'] == 'ERROR') {
          this.locals = []
          this.procecesdataservice.setdataTransform(this.locals, <Address>(adr));
        }
        else {
          this.procecesdataservice.setdataTransform(data.locals, <Address>(adr));
        }
      });
    }
    this.currentIW = null;
    this.previousIW = null;
  }
  filertLocals(f: FilterEntity, f2: FilterEntity) {
    if (f.isChecked) {
      if (this.filterby24) {
        this.locals = this.procecesdataservice.getDataFilterbyCaracteristicasByAcceso24HorasAll(this.filterbycaracte);
      } else if (this.filterby1erpiso) {
        this.locals = this.procecesdataservice.getDataFilterbyCaracteristicasByPisoAll(this.filterbycaracte);
      } else {
        this.locals = this.procecesdataservice.getDataTransform();
        f.isChecked = false;
        this.filteractual.isChecked = false;
      }

    } else {
      this.locals = this.procecesdataservice.getDataFilert(f, f2);
      this.filters.forEach(element => {
        element.isChecked = false
      });
      f.isChecked = true;
      this.filteractual = f
    }
  }
  filterbycaracte: FilterCaracteristicasEntity = {
    id: 'default',
    nombre: 'filt',
    state: false
  }
  filteractual: FilterEntity = {
    urlimg: 'default',
    longunid: 0,
    unitmetric: '',
    nummteric: 1,
    isHability: false,
    isChecked: false,
  };
  filterby24: boolean = false;
  filterby1erpiso: boolean = false;
  filtrarforcaracteristicas(fic1: FilterCaracteristicasEntity, fic2: FilterCaracteristicasEntity) {
    if (this.filteractual.isChecked) {
      console.log('filtrarPorCaracteristicaPasandoleElArrayActualFiltrado')
    } else {
      if (fic2.state && fic1.state) {
        this.filterby24 = true;
        this.locals = this.procecesdataservice.getDataFilterbyCaracteristicasByPisoandByAcceso24HorasAll(fic2)
      }
      else if (fic1.state) {
        this.locals = this.procecesdataservice.getDataFilterbyCaracteristicasByAcceso24HorasAll(fic2);
      } else if (fic2.state) {
        this.filterby1erpiso = true;
        this.locals = this.procecesdataservice.getDataFilterbyCaracteristicasByPisoAll(fic2);

      } else {
        this.locals = this.procecesdataservice.getDataTransform();
        this.filterby1erpiso = false;
        this.filterby24 = false;
      }
    }

  }
  Ordernamiento() {
    let or = this.locals.sort((a, b) => {
      if (a.local_distance < b.local_distance) {
        return -1
      } else if (a.local_distance > b.local_distance) {
        return 1
      }
      return 0
    })
    return or
  }
  comuna: string;
  region: string;
  pais: string;
  locals: LocalEntity[];
  zoom: number = 10;
  lat: number = -16.4090474;
  lng: number = -71.53745099999998
  agmFitBounds = true;
  locationsearch: Geometry;
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
      this.localsservice.getLocalsAllJson(this.searchsites[this.searchsites.length - 1]).subscribe(
        data => {
          this.locals = JSON.parse(JSON.stringify(data));
          this.procecesdataservice.setdataTransform(this.locals, address);
          this.locals = this.procecesdataservice.getDataTransform();
        }
      )
    }
    else {
      this.searchservice.setObjectSearching(<google.maps.places.PlaceResult>(address));

    }

    //Not Routing Change Search
  }
  buscarlugar() {

  }
  options = {
    componentRestrictions: {
      country: ['PE']
    }
  }
  //Markers
  markers: marker[] = []
  ngOnInit() {
    // $('#filtrosresponsive').click(function() {
    //   $('#showitems').dropdown('update')
    //   $('#showitems').dropdown().show()
    // })
    this.spinnerService.show();
    $('#select-order').change(() => {
      if ($('#select-order').val() == 'distance') {
        this.locals = this.Ordernamiento();
      }
      if ($('#select-order').val() == 'precio') {
        console.log('precio')
      }
    })
    this.region = this.activatedRoute.snapshot.paramMap.get('region');
    this.pais = this.activatedRoute.snapshot.paramMap.get('pais');
    this.comuna = this.activatedRoute.snapshot.paramMap.get('comuna');
    if (this.comuna == null) {
      this.comuna = this.region = this.activatedRoute.snapshot.paramMap.get('province');
    }
    this.locals = this.procecesdataservice.getDataTransform();
    if (this.locals.length == 0) {
      this.locals = []
    }
    for (let index = 0; index < this.locals.length; index++) {
      const element = this.locals[index];
      //Comprobacion de longitud 0 Razon ... Hay Arrays que Tienen longitud mayor a 0 pero con elementos Vacios
      if (element.unidad[0] == null) {
        console.log(element)
        this.locals.splice(index, 1)
      }
      this.lat = element.local_latitud;
      this.lng = element.local_longitud;
      this.markers.push({ lat: element.local_latitud, lng: element.local_longitud, label: 'xd', id: element.local_id })
    }
    let div: HTMLDivElement = document.createElement("div");
    var placesService = new google.maps.places.PlacesService(div)
    placesService.getDetails({
      placeId: "ChIJs7mFd0hKQpERNiCUuRKmxKM"
    }, (place, status) => {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let center = place.geometry.location;
        for (let index = 0; index < this.locals.length; index++) {
          const element = this.locals[index];
          let distanceobject = new google.maps.LatLng(element.local_latitud, element.local_longitud);
          let distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(distanceobject, center) / 1000;
          element.local_distance = Math.round(distanceInKm * 100) / 100;
        }
      }
    })
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 5000);
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  id: number

}
export interface FilterCaracteristicasEntity {
  id: string
  nombre: string;
  state: boolean
}
export interface FilterEntity {
  urlimg: string;
  longunid: number;
  unitmetric: string;
  nummteric: number;
  isHability: boolean;
  isChecked: boolean;
}
export interface LocalsEntity {
  idInstalacion: number;
  nombreInstalacion: string;
  regionInstalacion: string;
  comunaInstalacion: string;
  telefonoInstalacion: string;
  emailInstalacion: string;
  direccionInstalacion: string;
  descripcionInstalacion: string;
  latitudInstalacion: string;
  longitudInstalacion: string;
  ventanaReserva: number;
  eliminar: boolean;
  id_operador: string;
  usu_id?: string | null;
  t_galeria?: (TGaleriaEntity)[] | null;
  t_horarios?: (THorariosEntity)[] | null;
  t_unidades?: (TUnidadesEntity)[] | null;
  t_amenidades?: (TAmenidadesEntity)[] | null;
}
export interface TGaleriaEntity {
  idGaleria: string;
  url: string;
  orden: string;
  eliminar: boolean;
  id_instalacion: string;
}
export interface THorariosEntity {
  idhorarios: number;
  id_tipo: number;
  id_fechas: number;
  horaApertura: string;
  horaCierre: string;
  id_instalacion: number;
}
export interface TUnidadesEntity {
  idUnidad: string;
  areaTotal: number;
  TarifaMensual: string;
  Visible: number;
  Cantidad: string;
  eliminar: boolean;
  idEmpresa: string;
  VentanaReserva: number;
  id_instalacion: string;
  oferta: string;
  t_caracteristica?: (TCaracteristicaEntity)[] | null;
}
export interface TCaracteristicaEntity {
  idCaracteristica: string;
  climaControlado: boolean;
  acceso24Horas: boolean;
  piso1: string;
  id_unidad: string;
}
export interface TAmenidadesEntity {
  id: string;
  nombre: string;
  items?: (ItemsEntity)[] | null;
}
export interface ItemsEntity {
  id: string;
  nombre: string;
}

//Interfaces Rod
export interface LocalEntity {
  local_id: number;
  local_nombre: string;
  local_descripcion: string;
  empresa_id: number;
  local_telefono: number;
  local_email: string;
  local_pais: string;
  local_region: string;
  local_comuna: string;
  local_direccion: string;
  usuario_id: number;
  local_latitud: number;
  local_longitud: number;
  local_nDiasDeReserva: string;
  local_estaBorrado: string;
  unidad?: (UnidadEntity | null)[] | null;
  local_distance: number,
  shownumber: Boolean
}

export interface UnidadEntity {
  unidad_id: number;
  unidad_precioMensual: string;
  unidad_area: number;
  unidad_oferta: string;
  local_id: number;
  unidad_estaBorrado: string;
  unidad_estaDisponible: string;
  caracteristicas?: (CaracteristicasEntity)[] | null;
}
export interface CaracteristicasEntity {
  caracteristicasUnidad_id: number;
  caracteristicasUnidad_nombre: string;
}

