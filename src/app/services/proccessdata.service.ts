import { Injectable } from '@angular/core';
import { LocalsEntity, TUnidadesEntity, FilterEntity, LocalEntity, UnidadEntity } from '../components/search/search.component';
import { empty } from 'rxjs';
import { isUndefined } from 'util';
import { LocalUnitEntity } from '../interfaces/interfaces.interfaces';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader } from '@agm/core';
import { GrupoModificado, GrupoCaracteristic } from '../components/localdetails/localdetails.component';

@Injectable({
  providedIn: 'root'
})
export class ProccessdataService {

  local: LocalsEntity[];
  localtransform: LocalsEntity[];
  localunit: LocalsEntity;
  localunittransform: LocalsEntity;
  //**?Object News */
  localrod: LocalEntity[];
  localrodTransformd: LocalEntity[]
  //**?LocalUnity */
  localrodunit:LocalUnitEntity
  localunitrodTransformd:LocalUnitEntity
  constructor(private mapsAPILoader:MapsAPILoader) {}
  //**!Data Filter Unit */
  setDatalocalunit(object: LocalUnitEntity, id: string) {
    //Trans
    this.localrodunit = object;
  }
  getDatalocalunit() {
    let caracteristicas = Array<GrupoCaracteristic>();
    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    }
    this.localrodunit.caracteristicas.forEach(element => {
      caracteristicas.push(
        {
          gruponobre: element.grupo_caracteristicas.grupo_nombre,
          caracteristica: element.caracteristicasLocal_nombre
        }
      )
    });
    let grup = groupBy(caracteristicas, p => p.gruponobre);
    let obj=[]
    this.localrodunit.caracteristicas.forEach(element => {
      let caracteristica = []
      grup.get(element.grupo_caracteristicas.grupo_nombre).forEach(element => {
        caracteristica.push(element['caracteristica'])
      });
      obj.push({
        grupo:element.grupo_caracteristicas.grupo_nombre,
        caracteristicas:caracteristica
      })
    });
    var caracteristicarefs=Array<GrupoModificado>();
    var s=Array.from(new Set(grup))
    s.forEach(element => {
      caracteristicarefs.push({
        nombregrupo:element['0'],
        caracteriticas:element['1']
      })
    });
    console.log(this.localrodunit)
    this.localrodunit.caracteristicasmod=caracteristicarefs;

    return this.localrodunit = this.localrodunit;


  }


  setdataTransform(object: LocalEntity[], adrres:Address) {
    //
    let center=adrres.geometry.location;
    for (let index = 0; index < object.length; index++) {
      const element = object[index];
      let distanceobject=new google.maps.LatLng(element.local_latitud,element.local_longitud);
      let distanceInKm=google.maps.geometry.spherical.computeDistanceBetween(distanceobject,center)/1000;
      element.local_distance=Math.round(distanceInKm * 100) / 100;
      console.log(element)
    }
    this.localrod = object;
  }
  getDataTransform(): any {
    this.localrodTransformd = this.localrod;
    //**?LengCort */
    return this.localrodTransformd.filter(function (e) {
      let r: UnidadEntity[] = e.unidad;
      r.length = 3;
      return r
    })
  }
  getDataFilert(f1: FilterEntity, f2: FilterEntity): LocalEntity[] {
    //Deep Copy---not recursive
    var lt = JSON.parse(JSON.stringify(this.localrod));
    // console.log(lt);
    for (let index = 0; index < lt.length; index++) {
      var element = lt[index];
      var e = element.unidad.filter(function (e) {
        if (isUndefined(e)) {
        } else if (e != undefined) {
          // console.log(f1.longunid)
          switch (f1.longunid) {
            case 3:
              if (e.unidad_area>=1&&e.unidad_area<=3.9){
                var ex=e.unidad_area>=1&&e.unidad_area<=3.9
                return ex
              }
            case 5:
              // console.log('Entro')
              if (e.unidad_area>=4&&e.unidad_area<=5.9){
                var ex=e.unidad_area>=4&&e.unidad_area<=5.9
                return ex
              }
              break;
            case 7:
              if (e.unidad_area>=6&&e.unidad_area<=7.9){
                var ex=e.unidad_area>=6&&e.unidad_area<=7.9
                return ex
              }
              break;
            case 10:
              if (e.unidad_area>=8&&e.unidad_area<=11.9){
                var ex=e.unidad_area>=8&&e.unidad_area<=11.9
                return ex
              }
            case 15:
              if (e.unidad_area>=12&&e.unidad_area<=16.9){
                var ex=e.unidad_area>=12&&e.unidad_area<=16.9
                return ex
              }
              break;
            case 20:
              if (e.unidad_area>=17&&e.unidad_area<=24.9){
                var ex=e.unidad_area>=17&&e.unidad_area<=24.9
                return ex
              }
              break;
            case 30:
              if (e.unidad_area>=25&&e.unidad_area<=999.9){
                var ex=e.unidad_area>=25&&e.unidad_area<=999.9
                return ex
              }
              break;

            default:
              break;
          }
        }
      })
      element.unidad = e;
    }
    let lt2: LocalsEntity[] = [];
    for (let index = 0; index < lt.length; index++) {
      const element = lt[index];
      if (element.unidad.length == 0) {
      } else {
        lt2.push(element);
      }
    }
    lt = [...lt2];
    return lt;
  }
  state: number;
  //**?Data Filter by Unit Locals */
  getDataFilterUnitLocals(f1: FilterEntity, f2: FilterEntity): LocalUnitEntity {
    var lt: LocalUnitEntity = JSON.parse(JSON.stringify(this.localrodunit));
    if (this.state === f1.longunid) {
      return lt
    }
    else {
      let e = lt.unidad.filter(function (e) {
        switch (f1.longunid) {
          case 3:
            if (e.unidad_area>=1&&e.unidad_area<=3.9){
              var ex=e.unidad_area>=1&&e.unidad_area<=3.9
              return ex
            }
          case 5:
            console.log('Entro')
            if (e.unidad_area>=4&&e.unidad_area<=5.9){
              var ex=e.unidad_area>=4&&e.unidad_area<=5.9
              return ex
            }
            break;
          case 7:
            if (e.unidad_area>=6&&e.unidad_area<=7.9){
              var ex=e.unidad_area>=6&&e.unidad_area<=7.9
              return ex
            }
            break;
          case 10:
            if (e.unidad_area>=8&&e.unidad_area<=11.9){
              var ex=e.unidad_area>=8&&e.unidad_area<=11.9
              return ex
            }
          case 15:
            if (e.unidad_area>=12&&e.unidad_area<=16.9){
              var ex=e.unidad_area>=12&&e.unidad_area<=16.9
              return ex
            }
            break;
          case 20:
            if (e.unidad_area>=17&&e.unidad_area<=24.9){
              var ex=e.unidad_area>=17&&e.unidad_area<=24.9
              return ex
            }
            break;
          case 30:
            if (e.unidad_area>=25&&e.unidad_area<=999.9){
              var ex=e.unidad_area>=25&&e.unidad_area<=999.9
              return ex
            }
            break;

          default:
            break;
        }

      })
      lt.unidad = e;
      this.state = f1.longunid;
      console.log(lt)
      return lt;
    }
  }
  getDataFilterByCaracteristicas() {
    var l2 = this.local.slice();
    var lt = [...l2]
    console.log(lt);
    for (let index = 0; index < lt.length; index++) {
      var element = lt[index];
      var e = element.t_unidades.filter(function (e) {
        if (isUndefined(e)) {
        } else {
        }
      })
      element.t_unidades = e;
    }
    let lt2: LocalsEntity[] = [];
    for (let index = 0; index < lt.length; index++) {
      const element = lt[index];
      if (element.t_unidades.length == 0) {
      } else {
        lt2.push(element);
      }
    }
    lt = [...lt2];
    console.log(lt)
    return lt;
  }
  public removeEmpy(a: TUnidadesEntity[]): TUnidadesEntity[] {
    return a.filter(function (el) {
      return el != null;
    })
  }

}


//Interface
