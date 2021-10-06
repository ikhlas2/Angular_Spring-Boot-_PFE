import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/model/model.ticket';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-listeticket',
  templateUrl: './listeticket.component.html',
  styleUrls: ['./listeticket.component.css']
})
export class ListeticketComponent implements OnInit {
  content: boolean = true;
  ticketid: any;
  ticketidd: Ticket = new Ticket();
  public pageTickets: any;
  motCle: String = "";
  currentPage: number = 0;
  size: number = 5;
  public totalPages: number;
  public pages: Array<number>;
  public currentTicket: any;
  public updatedTicket : Ticket;
  public newticket:any;

  private roles: string[] = [];
  isLoggedIn = false;
  admin = false;
  username?: string;
  
  constructor(public http: HttpClient,
    public servCon: TicketService,
    public router: Router,
    private token: TokenStorageService,
    private tokenStorageService: TokenStorageService){ 
      }

  ngOnInit(): void {
    this.servCon.onload(this.motCle, this.currentPage, this.size, this.token.getToken())
      .subscribe(data => {
        this.pageTickets = data;
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        console.log(this.pages);
        console.log(this.pageTickets);
      }, err => {
        console.log(err);
      })
      
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
          const user = this.tokenStorageService.getUser();
          this.roles = user.roles;
    
          this.admin = this.roles.includes('ROLE_ADMIN'); 
          if (!this.admin) {
            this.router.navigateByUrl("error")
        }
      }
      else this.router.navigateByUrl("error")
    }
  

  doSearch() {
    this.servCon.onload(this.motCle, this.currentPage, this.size, this.token.getToken())
      .subscribe(data => {
        this.pageTickets = data;
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        console.log(this.pageTickets);
      }, err => {
        console.log(err);
      })
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token.getToken()
    })
  };

  chercher() {
    this.doSearch();
  }
//pagination
  gotoPage(i: number) {
    this.currentPage = i;
    console.log(this.currentPage);
    this.doSearch();
  }

  onEditTicket(url) {
    this.servCon.getTicketid(url, this.token.getToken())
    .subscribe(data => {
      this.ticketid = data['id'];
      this.servCon.getTicket(this.ticketid,this.token.getToken())
      .subscribe(data => {
        this.currentTicket = data;
        console.log(this.currentTicket);
      }, err => {
        console.log(err);
      });
    });
    
  }

  getTicketID(url) {
    this.servCon.getTicketid(url, this.token.getToken())
    .subscribe(data => {
      this.ticketidd = data;
      console.log(this.ticketidd.id);
    });
    let idd = this.ticketidd.id
    return idd;
  }

  //supprimer Tickets
   onDeleteTickets(c) {
    let conf = confirm("etes vous sure?");
    if (conf) {
      this.servCon.getTicketid(c, this.token.getToken()).subscribe(data => {
        this.servCon.deleteTicket(data.id, this.token.getToken()).subscribe(data => {
          console.log("Ticket deleted ok");
          // this.router.navigateByUrl("/about");
        },
          err => { console.log(err); })
        console.log(data.id);
      })
    }
    else{
      console.log("macaceptech");
      
    }

  } 
//accepter ticket
  onAceptTickets(c) {
    let conf = confirm("voulez-vous accepter ce ticket ?");
    if (conf) {
      this.servCon.getTicketid(c, this.token.getToken()).subscribe(data => {
        data.accepted=true;
        this.servCon.updateTickets(data.id,data, this.token.getToken()).subscribe(data => {
          this.servCon.sendMailIdTicket(data["id"],data["email"],this.token.getToken()).subscribe(res=>{
            console.log("l'email a été envoyé");
            this.ngOnInit();
          });
          console.log("Le ticket est accepté");
        },
          err => { console.log(err); })
        console.log(data.id);
      })
    }
    else{
      console.log("n'accepte pas");
    }
  }
  
  //modifier Tickets
  onUpdateTicket(value: any) {
    this.newticket = {
      nom: value.nom,
      prenom: value.prenom,
      nomSociete:value.nomSociete,
      email: value.email,
      status: value.status,
      date: value.date,
      type:value.type,
      commentaire:value.commentaire,
      priorite:value.priorite,
      tel: value.tel,
    };
    this.updatedTicket=value;
    console.log(this.ticketid);
    return this.servCon.updateTickets(this.ticketid,this.newticket,this.token.getToken() ).subscribe(data => {
      console.log(data);
      alert("Mise a jour efecuter avec succe");
      //this.router.navigateByUrl("/tickets")
    }, err => {
      console.log(err);
    })

  }

}
