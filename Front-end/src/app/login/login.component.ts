import { Component, OnInit,OnDestroy, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import Swal from 'sweetalert2';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private elementRef: ElementRef,private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) { }
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    else
      this.isLoggedIn = false;
  }

  checkifLogged(): boolean {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    else
      this.isLoggedIn = false;
    return this.isLoggedIn;
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        const Toast = Swal.mixin({
          background:'Mint',
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.loadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  loadPage(): void {
    //console.log(this.roles);

    if (this.roles.includes('ROLE_ADMIN')) {
      this.router.navigate(["/admin"]);
    }
    else
      if (this.roles.includes('ROLE_TECHNICIEN')) {
        this.router.navigate(["/technicien"]);

      }
      else
        this.router.navigate(["/home"]);
  }

}
