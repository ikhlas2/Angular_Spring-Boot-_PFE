import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../model/user.modele';

const API_URL = 'http://localhost:8082/api/test/';

@Injectable({
  providedIn: 'root'
})
export class TechService {

  constructor(private http: HttpClient,
    private httpClient: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getTechnicienBoard(): Observable<any> {
    return this.http.get(API_URL + 'tech', { responseType: 'text' });
  }

  public getTech(id,token:any) {
    return this.http.get("http://localhost:8082/users/" +id,
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }
  
 
   getUserByRoleV1(){
    return this.http.get("http://localhost:8082/chercherUsersTechenicien")
    .pipe(map(res => res));
    }

    getTechV1(motCle:String,token:any):Observable<Users>{
      return this.httpClient.get<Users>("http://localhost:8082/chercherUsersTechenicien?mc="+motCle+"&page0&page=&size=",
      {headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*',
       'Authorization': 'Bearer ' + token
     })});
     } 
}
