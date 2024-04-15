import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseURL = environment.baseUrl;

    constructor(private http: HttpClient) { }

    get currentUser(): IUser | undefined {
        const user = localStorage.getItem('user');
        if (!user) return undefined;
        return JSON.parse(user);
    }

    public login(email: string, password: string): Observable<IUser> {
        return this.http.get<IUser>(`${this.baseURL}/users/1`).pipe(
            tap(user => localStorage.setItem('user', JSON.stringify(user)))
        )
    }

    public logout(): void {
        localStorage.clear();
    }

    public checkAuthentication(): Observable<boolean> {
        if (!this.currentUser) return of(false);
        return this.http.get<boolean>(`${this.baseURL}/users/1`).pipe(
            map(() => true),
            catchError(() => of(false)));
    }

}