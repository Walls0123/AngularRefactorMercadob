import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SiteComponent } from './components/site/site.component';
import { SearchComponent } from './components/search/search.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SearchGuard } from './guards/search.guard';
import { LocalResolver } from './interfaces/locals.resolver'
import { LocalResolverDetails } from './interfaces/localsdetail.resolver'
import { LocaldetailsComponent } from './components/localdetails/localdetails.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservationeditComponent } from './components/reservationedit/reservationedit.component';
import { ReservaResolve } from './interfaces/reserva.resolver'
import { SitedashboardComponent } from './components/dashboard/sitedashboard/sitedashboard.component';
import { LoginComponent } from './components/dashboard/login/login.component';
import { HomedashComponent } from './components/dashboard/homedash/homedash.component';
import { GestiondashComponent } from './components/dashboard/gestiondash/gestiondash.component';
import { NewempresaComponent } from './components/dashboard/newempresa/newempresa.component';
const routes: Routes = [
  {
    path:'dashboard',component:SitedashboardComponent,children:[
      {path:'',component:HomedashComponent,pathMatch:'full'},
      {path:'login',component:LoginComponent,pathMatch:'full'},
      {path:'manage',component:GestiondashComponent,children:[
        {path:'newempresa',component:NewempresaComponent,pathMatch:'full'}
      ]}
    ]
  },{
  path: '', component: SiteComponent, children: [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
      path: 'search/:id', component: SearchComponent, pathMatch: 'full', canActivate: [SearchGuard],
      resolve: { locals: LocalResolver }
    },
    {
      path: 'search/:pais/:region/:province/:comuna', component: SearchComponent, pathMatch: 'full', canActivate: [SearchGuard],
      resolve: { locals: LocalResolver }
    },
    {
      path: 'search/:pais/:region/:province', component: SearchComponent, pathMatch: 'full', canActivate: [SearchGuard],
      resolve: { locals: LocalResolver }
    },
    {
      path: 'search/:pais/:region', component: SearchComponent, pathMatch: 'full', canActivate: [SearchGuard],
      resolve: { locals: LocalResolver }
    },
    { path: 'search/:pais', component: ReservaComponent, pathMatch: 'full' },
    { path: 'search', component: ReservaComponent, pathMatch: 'full' },
    { path: 'reservation/:id', component: ReservaComponent, pathMatch: 'full', canActivate: [SearchGuard], resolve: { reserva: ReservaResolve } },//canActivate:[SearchGuard],resolve:{reserva:ReservaResolve}
    { path: 'reservationedit/:id', component: ReservationeditComponent, pathMatch: 'full' },
    { pathMatch: 'full', component: LocaldetailsComponent, path: 'almacen/:id', resolve: { locals: LocalResolverDetails }, canActivate: [SearchGuard] },
    { path: '**', component: PagenotfoundComponent, pathMatch: 'full' }

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LocalResolver, LocalResolverDetails, ReservaResolve]
})
export class AppRoutingModule { }
