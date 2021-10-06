import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ComptesComponent } from './comptes/comptes.component';
import { TicketComponent } from './ticket/ticket.component';
//import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './comptes/users/users.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { ListeTechicienComponent } from './liste-techicien/liste-techicien.component';
import { NewUserComponent } from './comptes/new-user/new-user.component';
import { ListeticketComponent } from './listeticket/listeticket.component';

@NgModule({
  declarations: [
    AdminComponent,
    ComptesComponent, 
    TicketComponent,
    UsersComponent,
    ProfilAdminComponent,
    ListeTechicienComponent,
    NewUserComponent,
    ListeticketComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ]
})
export class AdminModule { }
