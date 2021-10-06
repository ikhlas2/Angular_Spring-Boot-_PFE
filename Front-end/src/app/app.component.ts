import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
// import { Routes } from '@angular/router';
// import {AdminComponent} from'src/app/admin/admin.component';
// import { Roles } from 'src/app/model/testrole'
// import { AuthGuard } from 'src/app/_helpers/auth.interceptor';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// const routes: Routes=[
//   { path: 'admin', 
//   component: AdminComponent,
//   canActivate: [AuthGuard],
//   data :{ roles:[Role.Admin] }
// }]
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showTicket = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  // if(this.roles.includes('ROLE_ADMIN')) || (this.roles.includes('ROLE_MODERATOR'))
  // {
  //   this.role=
  // }
  }

  logout(): void {
    this.tokenStorageService.signOut();
/*     window.location.reload();
 */  }
}
