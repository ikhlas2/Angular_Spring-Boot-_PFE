import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TechService } from 'src/app/services/tech.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liste-techicien',
  templateUrl: './liste-techicien.component.html',
  styleUrls: ['./liste-techicien.component.css']
})
export class ListeTechicienComponent implements OnInit {

constructor(private token: TokenStorageService,
    private servCon: TechService , private ticketService: TicketService,
    private tokenStorageService: TokenStorageService,
    public router: Router) { }

 public pageUsers:any;
 public pageTickets: any;
 public pages: Array<number>;
 tickets:any[]=[];
 ticketid:string;
 motCle:string ="";
 currentPage:number=0;
 size: number = 5;
 ticketsselected:any;
 id:any;

 private roles: string[] = [];
 isLoggedIn = false;
 admin = false;
 username?: string;
  ngOnInit(): void {
    this.servCon.getTech(this.id,this.token.getToken()).
    subscribe(data =>{
      console.log(data);
      this.pageUsers = data;
    },err=>{
      console.log(err);
    })
   // this.gettickerList();
   this.chercher();
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
    this.servCon.getTech(this.id,this.token.getToken())
       .subscribe(data => {
         this.pageUsers = data;
         this.pages = Array();
        console.log(this.pageUsers._embedded.users);
       }, err => {
         console.log(err);
         
       })
   }

  
   chercher() {
    this.servCon.getTechV1(this.motCle,this.token.getToken())
    .subscribe(data => {
      this.pageUsers = data;
     console.log(this.pageUsers);
    }, err => {
      console.log(err);
      
    });
     
   }
   chercherParTicket(){
    this.ticketService.chercher(this.motCle, this.currentPage, this.size)
    .subscribe((data:any)=>{
       this.pageTickets = data;
       this.pages=new Array(data.totalPages);
     }, err => {
       console.log(err);
     })
   }
   gettickerList(iduser){
     this.id = iduser;
    this.ticketService.getAllTicket().subscribe(pro=>{
      this.tickets=pro;
      var result = this.tickets.reduce((unique, o) => {
        if(!unique.some(obj => obj.nomSociete === o.nomSociete)) {
          unique.push(o);
        }
        return unique;
    },[]);
      console.log(this.tickets);
      this.tickets=result;
    },err=>{
      console.log(err);
      
    })
  }

  getTCH(id){
    console.log(id);
    this.ticketid=id;
    this.ticketService.getTicket(id,this.token.getToken()).subscribe(data=>{
      console.log(data);
      this.ticketsselected=data;
      
    })
  }

    onAffecttTickets() {
    let conf = confirm("voulez-vous affecter cette ticket ?");
    if (conf) {
      this.ticketService.affectUserToTicket(this.ticketid,this.id,this.token.getToken()).subscribe(res=>{
          alert("affecter avec succées ");
      },err=>{
        console.log(err);
        
      })
   }
   else{
   console.log("n'affecte pas");
   }

   } 

}
