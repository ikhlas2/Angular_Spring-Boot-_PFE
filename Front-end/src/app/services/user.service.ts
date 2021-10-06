import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../model/user.modele';

const API_URL = 'http://localhost:8082/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private httpClient: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getTechnicienBoard(): Observable<any> {
    return this.http.get(API_URL + 'tech', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  public getUser(token:any) {
    return this.http.get("http://localhost:8082/users" ,{headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + token
    })});
  }

  public getUserbyid(id:number) {
    return this.http.get("http://localhost:8082/users/"+id)
    .pipe(map(res => res ));
  }

  saveUser(user:Users){
     return this.http.post("http://localhost:8082/users",user)
    .pipe(map(res => res ));
 } 

  updateUser(user:Users){
    return this.http.put("http://localhost:8082/users/" +user.id,user)
    .pipe(map(res => res));
  }

  deleteUser(id:number){
    return this.http.delete("http://localhost:8082/users/"+id)
    .pipe(map(res => res));
    }
    getUserByRole(){
      return this.http.get("http://localhost:8082/chercherUsersTechenicien")
      .pipe(map(res => res));
      }

    gettechnicien(motCle:String,page:number,size:number,token:any):Observable<Users>{
        return this.httpClient.get<Users>("http://localhost:8082/chercherUsersTechenicien?mc="+motCle+"&page0&page="+page+"&size="+size,
        {headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin':'*',
         'Authorization': 'Bearer ' + token
       })});
       }
    }