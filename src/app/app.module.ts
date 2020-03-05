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
import {NgxSpinnerModule} from 'ngx-spinner'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SitedashboardComponent } from './components/dashboard/sitedashboard/sitedashboard.component';
import { LoginComponent } from './components/dashboard/login/login.component';
import { HeaderdashComponent } from './components/dashboard/headerdash/headerdash.component';
import { FooterdashComponent } from './components/dashboard/footerdash/footerdash.component';
import { HomedashComponent } from './components/dashboard/homedash/homedash.component';
import { GestiondashComponent } from './components/dashboard/gestiondash/gestiondash.component';
import { NewempresaComponent } from './components/dashboard/newempresa/newempresa.component';
import { NewlocalComponent } from './components/dashboard/newlocal/newlocal.component'
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
    MapComponent,
    SitedashboardComponent,
    LoginComponent,
    HeaderdashComponent,
    FooterdashComponent,
    HomedashComponent,
    GestiondashComponent,
    NewempresaComponent,
    NewlocalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    GooglePlaceModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBfl5JsPWncvaMJd0icji5e0huUNWh2aEo&amp'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[LoginreservationComponent]
})
export class AppModule { }
