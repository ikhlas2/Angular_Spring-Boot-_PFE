import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../model/model.contact';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
   }
   public getContact(id) {
    return this.httpClient.get("http://localhost:8082/contacts/" +id);
  }
  saveContact(contact:Contact,token:any){
    return this.httpClient.post("http://localhost:8082/contacts",contact,{headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }


 

}
