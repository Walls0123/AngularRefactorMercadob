import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProccessdataService } from 'src/app/services/proccessdata.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader } from '@agm/core';
import { Geometry } from 'ngx-google-places-autocomplete/objects/geometry';
import { SeacrchService } from 'src/app/services/seacrch.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //**!Propeties */
  filter: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  currentPage: number = 1;
  //**? FilterObject*/
  filters: FilterEntity[] = [
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_1.svg",
      nummteric: 2,
      longunid: 3,
      isHability:true
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_2.svg",
      nummteric: 2,
      longunid: 5,
      isHability:true
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_3.svg",
      nummteric: 2,
      longunid: 7,
      isHability:true
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_4.svg",
      nummteric: 2,
      longunid: 10,
      isHability:true
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_5.svg",
      nummteric: 2,
      longunid: 15,
      isHability:true
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_6.svg",
      nummteric: 2,
      longunid: 20,
      isHability:true
    },
    {
      unitmetric: "m",
      urlimg: "https://mercadobodegas.cl/almacenes/public/img/img_7.svg",
      nummteric: 2,
      longunid: 30,
      isHability:true
    }]
  urlicon: string = "https://es.seaicons.com/wp-content/uploads/2015/10/Warehouse-icon.png"
  textnext: string = 'Siguiente'
  textprevius: string = 'Anterior'
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private activatedRoute: ActivatedRoute, private procecesdataservice: ProccessdataService, private searchservice: SeacrchService) {
    //Valid if Navigate is For Routing
    if (this.searchservice.isRoutingSearching) {
      let searchplace = this.searchservice.getObjectSearching();
      this.region = this.activatedRoute.snapshot.paramMap.get('region');
      this.pais = this.activatedRoute.snapshot.paramMap.get('pais');
      this.comuna = this.activatedRoute.snapshot.paramMap.get('comuna');
      //Consulta A la Base de Datos Si es Posible Para Filtrar
      this.activatedRoute.data.subscribe((data:
        { locals: LocalEntity[] })=>{
        this.procecesdataservice.setdataTransform(data.locals,<Address>(searchplace));
      });

    }
    else{
      this.activatedRoute.data.subscribe((data: { locals: LocalEntity[] }) => {
        let searchplace = this.searchservice.getObjectSearching();
        this.procecesdataservice.setdataTransform(data.locals, <Address>(searchplace));
        // console.log(data.locals);
        this.region = this.activatedRoute.snapshot.paramMap.get('region')
        this.pais = this.activatedRoute.snapshot.paramMap.get('pais')
        this.comuna = this.activatedRoute.snapshot.paramMap.get('comuna')
        //Variable Serach
        let bpais = this.activatedRoute.snapshot.paramMap.get('pais')
        let bregion = this.activatedRoute.snapshot.paramMap.get('region')
        let bprovince = this.activatedRoute.snapshot.paramMap.get('province')
        let bcomuna = this.activatedRoute.snapshot.paramMap.get('comuna')
        {
          this.mapsAPILoader.load().then(() => {

            let autocomplete = new google.maps.places.AutocompleteService();
            autocomplete.getPlacePredictions(
              {
                input: bpais,
                componentRestrictions: { country: 'cl' }
              },
              (pre, status) => {
                console.log(pre)
              })
          })
        }
      })
    }

  }
  filertLocals(f: FilterEntity, f2: FilterEntity) {
    console.log(f, f2);
    this.locals = this.procecesdataservice.getDataFilert(f, f2);
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
    this.locationsearch = address.geometry
    let ditance1 = new google.maps.LatLng(this.lat, this.lng)
    address.address_components.forEach(element => {
      this.searchsites.push(element.long_name)
    });

    //Not Routing Change Search
  }
  options = {
    componentRestrictions: {
      country: ['CL']
    }
  }
  //Markers
  markers: marker[] = []
  ngOnInit() {

    this.locals = this.procecesdataservice.getDataTransform();
    //

    this.locals.forEach(element => {
      this.lat = element.local_latitud;
      this.lng = element.local_longitud;
      this.markers.push({ lat: element.local_latitud, lng: element.local_longitud, label: 'xd', id: element.local_id })
    });


  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  id: number

}
export interface FilterEntity {
  urlimg: string;
  longunid: number;
  unitmetric: string;
  nummteric: number;
  isHability:boolean
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
  local_distance:number
}
export interface UnidadEntity {
  unidad_id: number;
  unidad_precioMensual: string;
  unidad_area: number;
  unidad_oferta: string;
  local_id: number;
  unidad_estaBorrado: string;
  unidad_estaDisponible: string;
}
