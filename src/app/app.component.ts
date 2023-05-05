import { Component, OnInit } from '@angular/core';
import { StorageService } from './service/storage/storage.service';
import { AuthenticateService } from './service/auth/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string = "GUEST";
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private storageService: StorageService,private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.role;

      this.showAdminBoard = this.roles == 'ADMIN';
      this.showModeratorBoard = this.roles == 'MANAGER';

      this.username = user.username;
    }
  }


  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }
}
