import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginreservation',
  templateUrl: './loginreservation.component.html',
  styleUrls: ['./loginreservation.component.css']
})
export class LoginreservationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  login($event){
    this.router.navigate(['reservationedit','asdasd'])
  }
}
