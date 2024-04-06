import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero } from '@app/core/interfaces/hero.interface';
import { HeroService } from '@app/core/services/hero.service';
import { firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: IHero;

  private activatedRoute = inject(ActivatedRoute);
  private heroService = inject(HeroService);
  private router = inject(Router);

  async ngOnInit(): Promise<void> {
    const id: string = await firstValueFrom(this.activatedRoute.params.pipe(map(params => params['id'])));
    if (id) {
      this.getHeroById(id);
    }
  }

  public goBack(): void {
    this.router.navigate(['./heroes/list']);
  }

  private getHeroById(id: string) {
    this.heroService.getById(id).pipe().subscribe({
      next: hero => this.hero = hero,
      error: () => { this.router.navigate(['./heroes/list']) },
    });
  }

}
