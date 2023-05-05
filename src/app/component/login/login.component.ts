import { Component } from '@angular/core';
import { IToken } from 'src/app/model/IToken';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { StorageService } from 'src/app/service/storage/storage.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string;

  constructor(
    private authService: AuthenticateService, 
    private storageService: StorageService, 
    private userService : UserService) {
      // default role
      this.roles = "GUEST";
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().role;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.authenticate(username, password).subscribe({
      next: token  => {
        this.storageService.saveToken(token);
        this.userService.loadByUsername(username).subscribe({
            next: user => {
              this.storageService.saveUser(user);
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roles = this.storageService.getUser().role;
              // update parent component
              this.reloadPage();
            },
            error: err => {
              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
            }
          }
        )
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
