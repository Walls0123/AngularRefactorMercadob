import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbActiveModal,NgbModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap'
import { LoginreservationComponent } from '../loginreservation/loginreservation.component';
import { LoginService, LoginReserva } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import 'jquery';
import {ModalEvent,ModalOption,ModalEventHandler} from 'bootstrap'
import { isNull } from 'util';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  isLoad:boolean=true;
  loginstatus:boolean=true;
  modaloptions:NgbModalOptions={
    size:'lg'
  };
  constructor(private routeactivate:ActivatedRoute,private router:Router,private loginservice:LoginService) {
    this.routeactivate.data.subscribe((reserva: { reserva: ReservationEntity}) => {
      this.reservas=reserva.reserva
      if (isNull(reserva.reserva)) {
        console.log('not exits'),
        this.isLoad=false
      } else {
        this.isLoad=true
      }
      console.log(this.reservas)
    },error =>{
      console.log(error)
    })
  }
  reservas:ReservationEntity;
  ngOnInit() {
    // this.idreservation=this.reservas.reserva_codigo;
    // this.ngxQrcode2=`http://localhost:4201/reservation/${this.reservas.reserva_codigo}`
  }
  login(form:NgForm){
    let log:LoginReserva={
      login_correo:form.value.email,
      login_codigo:form.value.code
    }

    this.loginservice.loginReserva(log).toPromise().then((res)=>{
      let re=JSON.parse(res.toString());
      if (re['status']=='ok') {
        console.log(re)
        $('#myModal').modal('toggle')
        this.loginservice.setLoginTemporal(re['token'])
        this.router.navigate(['reservationedit','2'])
      }else{
        this.loginstatus=false
      }
    })
  }

  idreservation=this.routeactivate.snapshot.paramMap.get('id');
  ngxQrcode2 = 'asdasdasdasdasdasdasdasdkasdasd';
}
export interface ReservationEntity {
  reserva_id: number;
  reserva_nombre: string;
  reserva_apellido: string;
  reserva_email: string;
  reserva_telefono: number;
  reserva_fechaRegistro: string;
  reserva_fechaMudanza: string;
  reserva_estado: string;
  reserva_estaBorrado: string;
  unidad_id: number;
  reserva_codigo: string;
  reserva_token_edition: string;
}

