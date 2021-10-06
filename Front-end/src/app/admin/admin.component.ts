import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { from } from 'rxjs';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  admin = false;
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService
    ,private router: Router) { }

  ngOnInit(): void {
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

 
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
