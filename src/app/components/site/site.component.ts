import { Component, OnInit } from '@angular/core';
import { MetacolorService } from 'src/app/services/metacolor.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  constructor(private colorservice:MetacolorService) { }
  ngOnInit() {
  }
  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)

}
}
