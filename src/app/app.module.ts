import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteComponent } from './components/site/site.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { LocalComponent } from './components/local/local.component';
import { LocaldetailsComponent } from './components/localdetails/localdetails.component';
import { ReservaComponent } from './components/reserva/reserva.component'
import {NgxQRCodeModule} from 'ngx-qrcode2'
import{GooglePlaceModule} from 'ngx-google-places-autocomplete';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginreservationComponent } from './components/loginreservation/loginreservation.component';
import { ReservationeditComponent } from './components/reservationedit/reservationedit.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { MapComponent } from './components/map/map.component';
import {AgmCoreModule} from '@agm/core'
import {FormsModule} from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    HomeComponent,
    SearchComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent,
    LocalComponent,
    LocaldetailsComponent,
    ReservaComponent,
    LoginreservationComponent,
    ReservationeditComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    GooglePlaceModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBfl5JsPWncvaMJd0icji5e0huUNWh2aEo&amp'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[LoginreservationComponent]
})
export class AppModule { }
