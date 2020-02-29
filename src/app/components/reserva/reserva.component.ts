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
      if(reserva.reserva['status']=='ERROR'){
        this.isLoad=false
      }
      else{
        this.reservas=reserva.reserva;
        this.isLoad=true
      }
    },error =>{
      console.log(error)
    })
  }
  reservas:ReservationEntity;
  ngOnInit() {
    // this.idreservation=this.reservas.reserva_codigo;
    // this.ngxQrcode2=`http://localhost:4201/reservation/${this.reservas.reserva_codigo}`
  }
  cancelarReserva(){
    this.loginservice.cancelarserver(this.reservas.reserva_id.toString()).toPromise().then((r)=>{
      console.log(r)
    })
  }
  login(form:NgForm){

    let modreserva:ModificarReservaEntity={
      reserva_nombre:form.value.name,
      reserva_apellido:form.value.apellido,
      reserva_telefono:form.value.phone,
      reserva_fechaMudanza:form.value.date,
      reserva_token_edition:this.reservas.reserva_token_edition
    };

    this.loginservice.modificarReserva(modreserva).toPromise().then((res)=>{
      console.log(res)
      let re=JSON.parse(res.toString());
      if (re['status']=='OK') {
        console.log(re)
        $('#myModal').modal('toggle')
        this.loginservice.setLoginTemporal(re['items']['token'])
        // this.router.navigate(['reservationedit','2'])
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
  unidad: Unidad;
}
export interface ModificarReservaEntity{
  login_correo?: string;
  login_codigo?:string;
  reserva_nombre?: string;
  reserva_apellido?: string;
  reserva_telefono?: number;
  reserva_fechaMudanza?: string;
  reserva_token_edition: string;
}

export interface Unidad {
  unidad_id: number;
  unidad_precioMensual: string;
  unidad_area: number;
  unidad_oferta: string;
  local_id: number;
  unidad_estaBorrado: string;
  unidad_estaDisponible: string;
  local: Local;
}
export interface Local {
  local_id: number;
  local_nombre: string;
  local_descripcion: string;
  empresa_id: number;
  local_telefono: number;
  local_email: string;
  local_pais: string;
  local_region: string;
  local_provincia: string;
  local_comuna: string;
  local_direccion: string;
  usuario_id: number;
  local_latitud: number;
  local_longitud: number;
  local_nDiasDeReserva: string;
  local_estaBorrado: string;
  horario?: (HorarioEntity)[] | null;
}
export interface HorarioEntity {
  horario_id: number;
  horario_horaEntrada: string;
  horario_horaSalida: string;
  horario_tipo: string;
  local_id: number;
  horario_dia: string;
}


