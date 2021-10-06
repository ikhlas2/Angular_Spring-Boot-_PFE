import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../model/model.ticket';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) {
   }

  public onload(motCle:String,page:number,size:number,token:any):Observable<Ticket>{
   return this.httpClient.get<Ticket>("http://localhost:8082/tickets/search/byNomPage?mc="+motCle+"&page0&page="+page+"&size="+size,
   {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Authorization': 'Bearer ' + token
  })});
  }

  public getTicket(id,token:any) {
    return this.httpClient.get("http://localhost:8082/tickets/" +id,
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }
  public getAllTicket() {
    return this.httpClient.get<any[]>("http://localhost:8082/tickets/" ,
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' 
    })});
  }

  public getTicketid(url:any,token:any) : Observable<Ticket>{
    return this.httpClient.get<Ticket>(url,{headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }
  saveTicket(ticket:Ticket){
    return this.httpClient.post("http://localhost:8082/tickets",ticket)
    .pipe(map(res => res));
  }

  updateTickets(id,data,token){
    return this.httpClient.put("http://localhost:8082/tickets/"+id,data,{headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }

  deleteTicket(id,token:any){
    return this.httpClient.delete("http://localhost:8082/tickets/"+id,{headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }

  sendMailIdTicket(id,mail,token:any){
    return this.httpClient.get("http://localhost:8082/sendmailwithid/"+id+"/"+mail,{headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }

  public chercher(motCle:String,page:number,size:number):Observable<Ticket>{
    return this.httpClient.get<Ticket>("http://localhost:8082/tickets/chercherTickets?mc="+motCle+"&page0&page="+page+"&size="+size,
    {headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin':'*',
     'Authorization': 'Bearer '
   })});
   }

   public affectUserToTicket(idticket,iduser,token:any){
    return this.httpClient.put("http://localhost:8082/tickets/affectTicket/"+idticket+"/"+iduser,{},
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }   
  public getTicketByUser(iduser){
    return this.httpClient.get("http://localhost:8082/users/"+iduser+"/ticket");
  }

  public closeTicket(id){
    return this.httpClient.get("http://localhost:8082/tickets/closeTicket/"+id);
  }

}
