import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetacolorService {

  constructor(private meta:Meta) { }
  changeColor(color:string){
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", color);
  }
  changeThemeColorUsingMeta(color: string) {
    this.meta.updateTag({ content: color }, 'name=theme-color');
  }
}
