import { Component, OnInit, Input } from '@angular/core';
import { LocalsEntity, LocalEntity } from '../search/search.component';
import 'jquery'
@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  @Input() local: LocalEntity;
  urldomini: string = "https://www.mercadobodegas.cl/almacenes/public/img/instalaciones/"
  urlig: string;
  constructor() { }
  responive: boolean = false
  normal: boolean = true
  ngOnInit() {
    this.local.shownumber=false
    if (window.matchMedia('(max-width: 576px)').matches) {
      //...
      this.responive = true;
      this.normal = false
      console.log('Responsive')
    } else {

    }
    this.urlig = "https://www.mercadobodegas.cl/almacenes/public/img/instalaciones/16/MiniBodegasSantiago_20-01-56_2020-01-20_1.jpg";
  }
  shownumber(local:LocalEntity){
    local.shownumber=true
    console.log(local)
  }
}
