import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  public login(): void {
    this.authService.login('', '').subscribe({
      next: (user) => {
        this.router.navigate(['/']);
      }
    });
  }

}
