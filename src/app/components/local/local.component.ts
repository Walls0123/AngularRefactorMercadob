import { Component, OnInit, Input } from '@angular/core';
import { LocalsEntity, LocalEntity } from '../search/search.component';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  @Input() local:LocalEntity;
  urldomini:string="https://www.mercadobodegas.cl/almacenes/public/img/instalaciones/"
  urlig:string;
  constructor() { }

  ngOnInit() {
    // console.log(this.local);
    this.urlig="https://www.mercadobodegas.cl/almacenes/public/img/instalaciones/16/MiniBodegasSantiago_20-01-56_2020-01-20_1.jpg";
  }

}
