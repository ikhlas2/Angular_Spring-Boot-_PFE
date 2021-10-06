import { Component, OnInit } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/model/user.modele';
import { UserService } from 'src/app/services/user.service';
/* import{UsersComponent} from'src/app/admin/comptes/';
 */
import { Observable } from 'rxjs';
import{Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit {
user:Users=new Users();
mode:number=1;

form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(public http:HttpClient,public userService:UserService,public authService:AuthService,public router:Router) { }

  ngOnInit() {
  
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
      Swal.fire(
        'Saved successful',
        'You clicked the button!',
        'success'
      )
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;

    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
  );
  this.router.navigateByUrl("/admins/users");
}
annuler(){
  this.router.navigateByUrl("/admins/users");
}
}


