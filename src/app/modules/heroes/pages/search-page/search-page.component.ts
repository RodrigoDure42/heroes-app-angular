import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IHero } from '@app/core/interfaces/hero.interface';
import { HeroService } from '@app/core/services/hero.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: IHero[] = [];

  private heroService = inject(HeroService);

  public searchHero(): void {
    const value = this.searchInput.value || '';
    this.heroService.getSuggestions(value).subscribe({
      next: heroes => this.heroes = heroes,
      error: () => { this.heroes = [] },
    })
  }

  public displayFn(option: IHero): string {
    return option.superhero ? option.superhero : '';
  }

}
