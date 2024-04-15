import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn | CanMatchFn = (
) => {
    return checkAuthentication();
}

const checkAuthentication = async () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuthenticated = await firstValueFrom(authService.checkAuthentication());

    if (isAuthenticated) {
        router.navigate(['/heroes']);
    }
    return !isAuthenticated;
}
