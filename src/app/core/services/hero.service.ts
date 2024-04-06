import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IHero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroService {

    private http: HttpClient = inject(HttpClient);

    private baseUrl: string = environment.baseUrl;

    public getHeroes(): Observable<IHero[]> {
        return this.http.get<IHero[]>(`${this.baseUrl}/heroes`);
    }
    public getById(id: string): Observable<IHero> {
        return this.http.get<IHero>(`${this.baseUrl}/heroes/${id}`);
    }

    public getSuggestions(query: string): Observable<IHero[]> {
        return this.http.get<IHero[]>(`${this.baseUrl}/heroes?q=${query}&limit=5`);
    }

    public addHero(hero: IHero): Observable<IHero> {
        return this.http.post<IHero>(`${this.baseUrl}/heroes`, hero);
    }

    public updateHero(hero: IHero): Observable<IHero> {
        if (!hero.id) throw new Error('Hero id is required');
        return this.http.patch<IHero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    public deleteHero(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/heroes/${id}`);
    }

}