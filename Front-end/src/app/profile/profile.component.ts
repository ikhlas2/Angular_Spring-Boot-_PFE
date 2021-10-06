import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import{ Users } from 'src/app/model/user.modele';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users:Users=new Users();
  currentUser: any;
  private roles: string[] = [];
  isLoggedIn = false;
  admin = false;
  username?: string;
  constructor(private token: TokenStorageService,
    public servCon: UserService,
    private tokenStorageService: TokenStorageService,
    public router: Router,) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getUser(); 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        this.admin = this.roles.includes('ROLE_USER');      
      }
    else this.router.navigateByUrl("error")
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
