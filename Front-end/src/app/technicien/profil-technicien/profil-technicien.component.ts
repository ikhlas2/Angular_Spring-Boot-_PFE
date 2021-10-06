import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import{ Users } from 'src/app/model/user.modele';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-technicien',
  templateUrl: './profil-technicien.component.html',
  styleUrls: ['./profil-technicien.component.css']
})
export class ProfilTechnicienComponent implements OnInit {
  users:Users=new Users();
  currentUser: any;

  constructor(private token: TokenStorageService,
    public servCon: UserService,) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getUser(); 
  }
   getUser():void{
   this.servCon.getUserbyid(this.token.getUser().id)
   .subscribe((data:any)=>
   {this.users=data;
 },err=>{console.log(err);
 })
   }
   onUpdateUser(){
    this.servCon.updateUser(this.users)
    .subscribe(data=>
     {
       console.log(data);
       alert("Mise à jour effectué");
       window.location.reload();
           },err=>{console.log(err);
     alert("probleme")
     })
  } 

}
