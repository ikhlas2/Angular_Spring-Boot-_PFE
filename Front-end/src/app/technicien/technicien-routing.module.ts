import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './ticket/ticket.component';
import { TechnicienComponent } from './technicien.component';
import { ProfilTechnicienComponent } from './profil-technicien/profil-technicien.component';

const routes: Routes = [
  { path: '', component: TechnicienComponent,children:[
      {path:'tickets',component:TicketComponent},
      {path:'profil-technicien',component:ProfilTechnicienComponent},
]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicienRoutingModule { }
