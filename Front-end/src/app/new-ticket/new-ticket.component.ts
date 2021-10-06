import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Ticket } from '../model/model.ticket';
import { TicketService } from '../services/ticket.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {
  ticket:Ticket=new Ticket();
  mode:number=1;
  constructor(public ticketsService:TicketService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }
  saveTicket(){
   let ticket2 = this.ticket;
    this.ticketsService.saveTicket(this.ticket)
      .subscribe(data => {
        console.log(data); 
      this.mode=2;
    }, err => {
      console.log(err);
    })  }
    
    logout(): void {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
}
