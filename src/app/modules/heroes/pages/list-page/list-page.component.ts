import { Component, OnInit, inject } from '@angular/core';
import { IHero } from '@app/core/interfaces/hero.interface';
import { HeroService } from '@app/core/services/hero.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public heroes: IHero[] = [];

  private heroService = inject(HeroService);

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
