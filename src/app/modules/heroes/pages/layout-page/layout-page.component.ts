import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@app/core/interfaces/user.interface';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sideBarItems = [
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'Search', icon: 'search', url: './search' }
  ]

  private authService = inject(AuthService);
  private router = inject(Router);

  get user(): IUser | undefined {
    return this.authService.currentUser;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
