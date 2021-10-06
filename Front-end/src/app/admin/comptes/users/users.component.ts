import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/user.modele';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
user:Users=new Users();
mode:number=1;
form: any ={};
currentPage: number = 0;
public currentTicket: any;
public pages: Array<number>;

isSuccessful =  false;
isSignUpFailed = false;
errorMessage = '';
  constructor(private token: TokenStorageService,
     private servCon: UserService,public authService:AuthService,public userService:UserService) { }

  public pageUsers:any;
  
  ngOnInit(): void {
    this.servCon.getUser(this.token.getToken()).subscribe(data =>{
      console.log(data);
      this.pageUsers = data;
    },err=>{
      console.log(err);
    })
  }
  //pagination
  gotoPage(i: number) {
    this.currentPage = i;
    console.log(this.currentPage);
    //this.doSearch();
  }
   onDeleteUser(u:Users) {
    let conf = window.confirm("etes vous sure?");
    if (conf==true) {
        this.servCon.deleteUser(u.id)
        .subscribe(data => 
          
          {this.pageUsers.content.splice(
          this.pageUsers.content.indexOf(u),1
        );
        },err => { console.log(err);
      })
    }

  } 
   saveUser(){
     this.userService.saveUser(this.user)
     .subscribe((data:any)=>{this.user=data;
      this.mode=2;
         console.log(data)
    },err=>{console.log(err);
     })  
   }
    onSubmit() {
      this.authService.register(this.form).subscribe(
       data => {
        console.log(data);
        this.isSuccessful = true;
         this.isSignUpFailed = false;
  
      },
      err => {
        this.errorMessage = err.error.message;
         this.isSignUpFailed = true;
        }
    );
    }
}