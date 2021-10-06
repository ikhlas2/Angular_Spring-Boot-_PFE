import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TechnicienComponent } from '../technicien/technicien.component';
import { AdminComponent } from './admin.component';
import { ComptesComponent } from './comptes/comptes.component';
import { NewUserComponent } from './comptes/new-user/new-user.component';
import { UsersComponent } from './comptes/users/users.component';
import { ListeTechicienComponent } from './liste-techicien/liste-techicien.component';
import { ListeticketComponent } from './listeticket/listeticket.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { TicketComponent } from './ticket/ticket.component';

//import { UpdateTicketComponent } from './update-ticket/update-ticket.component';

const routes: Routes = [
  { path: '', component: AdminComponent,children:[
      {path:'comptes',component:ComptesComponent},
      {path:'tickets',component:TicketComponent},
      {path:'users',component:UsersComponent},
      {path:'profil-admin',component:ProfilAdminComponent},
      {path:'liste-technicien',component:ListeTechicienComponent},
      {path:'new-user',component:NewUserComponent},
      {path:'list-ticket',component:ListeticketComponent},





      //{path:'editTickets/:id',component:UpdateTicketComponent},

]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
