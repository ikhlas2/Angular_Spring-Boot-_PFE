import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Ticket } from '../model/model.ticket';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private roles: string[];
  username: string;
  ticket: Ticket = new Ticket();
  mode: number = 1;
  public pageTickets: any;
  public pages: Array<number>;
  id: any;
  client = false;
  contact :any = "";
  contactForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    sujet: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(private tokenStorageService: TokenStorageService,
    private elementRef: ElementRef,
    public ticketsService: TicketService,
    public servCon: TicketService,
    public token: TokenStorageService,
    public contactsService: ContactService,
    public router: Router) { }


  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {

    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
    }
  }
  checkifLogged(): boolean {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
    else
      this.isLoggedIn = false;
    return this.isLoggedIn;


  }
  doSearch() {
    this.servCon.getTicket(this.id, this.token.getToken())
      .subscribe(data => {
        this.pageTickets = data;
        this.pages = Array();
        console.log(this.pageTickets._embedded.tickets);
      }, err => {
        console.log(err);

      })
  }

  chercher() {
    this.servCon.getTicket(this.id, this.token.getToken())
      .subscribe(data => {
        this.pageTickets = data;
        console.log(this.pageTickets);
      }, err => {
        console.log(err);
      });
  }

  saveTicket() {
    let ticket2 = this.ticket;
    this.ticketsService.saveTicket(this.ticket)
      .subscribe(data => {
        Swal.fire({
          background:'Mint',
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 4000
        })
        console.log(data);
        this.mode = 2;
      }, err => {
        console.log(err);
      })
  }

  saveContact(){
    console.log(this.contactForm.value);
    this.contactsService.saveContact(this.contactForm.value,this.token.getToken())
  .subscribe(data => {
    Swal.fire(
      'to send successful',
      'You clicked the button!',
      'success'
    )
    console.log(data);
  }, err => {
    console.log(JSON.parse(err.body).message);
  })     
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


  close(id) {
    this.ticketsService.closeTicket(id)
      .subscribe(data => {
        Swal.fire(
          'Close successful',
          'You clicked the button!',
          'success'
        )
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
}

