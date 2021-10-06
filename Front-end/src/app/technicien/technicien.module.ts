import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket/ticket.component';
import { TechnicienRoutingModule } from './technicien-routing.module';
import { TechnicienComponent } from './technicien.component';
import { FormsModule } from '@angular/forms';
import { ProfilTechnicienComponent } from './profil-technicien/profil-technicien.component';


@NgModule({
  declarations: [
    TechnicienComponent,
    TicketComponent,
    ProfilTechnicienComponent,
  ],
  imports: [
    CommonModule,
    TechnicienRoutingModule,
    FormsModule,
  ]
})
export class TechnicienModule { }
