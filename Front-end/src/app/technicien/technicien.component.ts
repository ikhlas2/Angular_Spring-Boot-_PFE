import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  technicien = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService,
    public router: Router,
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
  
        this.technicien = this.roles.includes('ROLE_TECHNICIEN'); 
        console.log(this.technicien);
          if (!this.technicien) {
            this.router.navigateByUrl("error")
          }
      }
    
    else this.router.navigateByUrl("error")
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigateByUrl("/home");


  }

}
