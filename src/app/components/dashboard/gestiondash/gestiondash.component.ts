import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery'
import 'bootstrap'
@Component({
  selector: 'app-gestiondash',
  templateUrl: './gestiondash.component.html',
  styleUrls: ['./gestiondash.component.css']
})
export class GestiondashComponent implements OnInit {
  heinghscroll=Math.floor(window.innerHeight*90)/100
  empresas:EmpresaEntity[]=[
    {
      nombre:'AeaMongoles',
      local:[
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local2',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
      ]
    },
    {
      nombre:'AeaMongoles2',
      local:[
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local2',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
      ]
    },
    {
      nombre:'AeaMongoles3',
      local:[
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local2',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
      ]
    },
    {
      nombre:'AeaMongoles5',
      local:[
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local2',
        unidad:[
          {area:4,precio:1002}
        ]
        },
        {nombre:'Local1',
        unidad:[
          {area:4,precio:1002}
        ]
        },
      ]
    }
  ]
  constructor(private router:Router) {
    console.log(Math.floor(window.innerHeight*90)/100)

  }

  ngOnInit() {
    $('#myModal').on('hidden.bs.modal', function () {
      // do something…
      console.log('cerrado')
    })
  }
  crear(){
    this.router.navigate(['dashboard','manage','newempresa'])
  }
  textbutton='Ver mas'
  agregarmas(event,i:number){
    this.textbutton='Ver menos'
    console.log(event)
    this.empresas[i].local.push({
      nombre:'AEA'
    },{
      nombre:'CPP'
    },{
      nombre:'CPP'
    },{
      nombre:'CPP'
    },{
      nombre:'CPP'
    },{
      nombre:'CPP'
    })
  }
}
export interface EmpresaEntity{
  nombre:string,
  local?: (LocalEntity)[] | null;
}
export interface LocalEntity{
  nombre:string,
  unidad?: (UnidadEntity)[] | null;
}

export interface UnidadEntity{
  area:number,
  precio:number
}
