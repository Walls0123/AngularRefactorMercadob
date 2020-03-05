import { Component, OnInit } from '@angular/core';
import 'jquery'
import 'bootstrap'
@Component({
  selector: 'app-newlocal',
  templateUrl: './newlocal.component.html',
  styleUrls: ['./newlocal.component.css']
})
export class NewlocalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#myModal').on('hidden.bs.modal', function () {
      // do something…
      console.log('cerrado')
    })
  }

}
