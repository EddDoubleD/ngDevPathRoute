import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthenticateService) { }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password, "USER").subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
