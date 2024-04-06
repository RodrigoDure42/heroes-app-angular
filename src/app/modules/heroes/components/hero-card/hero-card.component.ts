import { Component, Input } from '@angular/core';
import { IHero } from '@app/core/interfaces/hero.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styles: ``
})
export class HeroCardComponent {

  @Input({ required: true })
  public hero!: IHero;

}

