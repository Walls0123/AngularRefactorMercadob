import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProccessdataService } from 'src/app/services/proccessdata.service';
import { LocalsEntity, FilterEntity, LocalEntity, TUnidadesEntity } from '../search/search.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Form, NgForm } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva.service';
import { LocalUnitEntity, UnidadEntity } from 'src/app/interfaces/interfaces.interfaces';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-localdetails',
  templateUrl: './localdetails.component.html',
  styleUrls: ['./localdetails.component.css']
})
export class LocaldetailsComponent implements OnInit {
  isLoad = true;
  locals: LocalUnitEntity;
  medida: number;
  constructor(private reservaService: ReservaService, private titleService: Title, private tags: Meta, private route: Router, private activatedRoute: ActivatedRoute, private procecesdataservice: ProccessdataService) {
    var snap = activatedRoute.snapshot;
    this.activatedRoute.queryParams.subscribe(params => {
      this.medida = (params['medidas'])
    });
    this.activatedRoute.data.subscribe((data: { locals: LocalUnitEntity }) => {
      if (data.locals['status'] == 'ERROR') {
        this.isLoad = false
        console.log('error')
      } else {
        this.titleService.setTitle("Por Ahi.com");
        this.tags.addTag({ name: 'description', content: 'Title and Meta tags examples' })
        this.isLoad = true
        this.procecesdataservice.setDatalocalunit(data.locals, snap.paramMap.get('id'));
      }

      // console.log(data.locals);
    })
  }
  // case 3:
  //           if (e.unidad_area>=1&&e.unidad_area<=3.9){
  //             var ex=e.unidad_area>=1&&e.unidad_area<=3.9
  //             return ex
  //           }
  //         case 5:
  //           console.log('Entro')
  //           if (e.unidad_area>=4&&e.unidad_area<=5.9){
  //             var ex=e.unidad_area>=4&&e.unidad_area<=5.9
  //             return ex
  //           }
  //           break;
  //         case 7:
  //           if (e.unidad_area>=6&&e.unidad_area<=7.9){
  //             var ex=e.unidad_area>=6&&e.unidad_area<=7.9
  //             return ex
  //           }
  //           break;
  //         case 10:
  //           if (e.unidad_area>=8&&e.unidad_area<=11.9){
  //             var ex=e.unidad_area>=8&&e.unidad_area<=11.9
  //             return ex
  //           }
  //         case 15:
  //           if (e.unidad_area>=12&&e.unidad_area<=16.9){
  //             var ex=e.unidad_area>=12&&e.unidad_area<=16.9
  //             return ex
  //           }
  //           break;
  //         case 20:
  //           if (e.unidad_area>=17&&e.unidad_area<=24.9){
  //             var ex=e.unidad_area>=17&&e.unidad_area<=24.9
  //             return ex
  //           }
  //           break;
  //         case 30:
  //           if (e.unidad_area>=25&&e.unidad_area<=999.9){
  //             var ex=e.unidad_area>=25&&e.unidad_area<=999.9
  //             return ex
  //           }
  maplocation: string;
  errormensaje: string;
  shownumber(){
    this.locals.shownumber=true
  }
  ngOnInit() {
    this.locals = this.procecesdataservice.getDatalocalunit();
    this.locals.shownumber=false
    // console.log(grup.get('pagos'))
    // let caracteristica=[]
    // grup.get('pagos').forEach(element => {
    //   console.log(element)
    //   caracteristica.push(element['caracteristica'])
    // });

    // let s=[...new Set(grupo)]
    // let car=[]
    // this.locals.caracteristicas.forEach(element => {
    //   for (let index = 0; index < s.length; index++) {
    //     if (element.grupo_caracteristicas.grupo_nombre===s[index]) {

    //     }
    //   }
    // });


    this.locals.unidad.forEach(e => {
      if (e.unidad_area >= 1 || e.unidad_area <= 3.9) {
        this.filters[0].isHability = true
      } else {
        this.filters[0].isHability = false
      }
      if (e.unidad_area >= 4 || e.unidad_area <= 5.9) {
        this.filters[1].isHability = true
      }
      else {
        this.filters[1].isHability = false
      }
      if (e.unidad_area >= 6 || e.unidad_area <= 7.9) {
        this.filters[2].isHability = true
      }
      else {
        this.filters[2].isHability = false
      }
      if (e.unidad_area >= 8 || e.unidad_area <= 11.9) {
        this.filters[3].isHability = true
      }
      else {
        this.filters[3].isHability = false
      }
      if (e.unidad_area >= 12 || e.unidad_area <= 16.9) {
        this.filters[4].isHability = true
      }
      else {
        this.filters[4].isHability = false
      }

      if (e.unidad_area >= 17 || e.unidad_area <= 24.9) {
        this.filters[5].isHability = true
      }
      else {
        this.filters[5].isHability = false
      }

      if (e.unidad_area >= 25 || e.unidad_area <= 999.9) {
        this.filters[6].isHability = true
      } else {
        this.filters[6].isHability = false
      }
    });
  }
  errormensajeenviar: string;
  onSumbit(form: NgForm, id: UnidadEntity) {
    if (form.value.firstname == '' || form.value.lastname == '' ||
      form.value.email == '' || form.value.phone == ''
      || form.value.fecha == '') {
      this.errormensaje = 'Faltan datos'
    } else {
      let reserva: ReservaEntity = {
        reserva_nombre: form.value.firstname,
        reserva_apellido: form.value.lastname,
        reserva_email: form.value.email,
        reserva_telefono: form.value.phone,
        reserva_fechaMudanza: form.value.fecha,
        unidad_id: id.unidad_id

      }
      this.reservaService.sendReserva(reserva).toPromise().then(
        res => {
          console.log(res)
          if (res.status == 'OK') {
            $('#modalconfirmacion').modal('show')
            this.idreserva = res['items'][0]['cuerpo']['reserva_codigo'];
          }
          else {
            this.errormensajeenviar = 'Error de Datos'
          }
        }
      )
    }

  }
  idreserva: string;
  continuarreserva() {
    console.log(this.idreserva)
    $('#modalconfirmacion').modal('hide')
    this.route.navigateByUrl(`reservation/${this.idreserva}`)
  }
  filertLocals(f: FilterEntity, f2: FilterEntity) {
    this.locals = this.procecesdataservice.getDataFilterUnitLocals(f, f2);
  }
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
      isHability: false,
      isChecked: false
    }
  ]
  url: string = 'https://www.mercadobodegas.cl/almacenes/public/img/instalaciones/'
  getUrl(url: string, idins: string): String {
    return url.concat('/').concat(idins).concat('/').concat(url)
  }
  getFecha(i: number): String {
    switch (i) {
      case 1:
        return 'Lunes'
        break;
      case 2:
        return 'Martes'
        break;
      case 3:
        return 'Miercoles'
        break;
      case 4:
        return 'Jueves'
        break;
      case 5:
        return 'Viernes'
        break;
      case 6:
        return 'Sabado'
        break;
      case 7:
        return 'Domingo'
        break;
      default:
        return 'Noting'
    }
  }
}
export interface ReservaEntity {
  reserva_nombre: string;
  reserva_apellido: string;
  reserva_email: string;
  reserva_telefono: string;
  reserva_fechaMudanza: string;
  unidad_id: number;
}
export interface GrupoCaracteristic {
  gruponobre: string;
  caracteristica: string
}
export interface GrupoModificado {
  nombregrupo: string;
  caracteriticas: [
    {
      nombrecaraceristicas: string
    }
  ]
}
  //     "reserva_nombre": "niksosni",
  //     "reserva_apellido": "besllsicc",
  //     "reserva_email": "nikoBellsicc@gmasil.com",
  //     "reserva_telefono": 11111112,
  //     "reserva_fechaMudanza": "2020-02-06",
  //     "unidad_id": 2
  // }
