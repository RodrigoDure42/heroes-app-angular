import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero } from '@app/core/interfaces/hero.interface';
import { HeroService } from '@app/core/services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ]

  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  private matDialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  public form: FormGroup = this.fb.group({
    id: [''],
    superhero: ['', Validators.required],
    publisher: [''],
    alter_ego: [''],
    first_appearance: [''],
    characters: [''],
    alt_img: [''],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.heroService.getById(id).subscribe({
        next: (hero) => this.setForm(hero),
        error: (err) => {
          console.log(err);
          this.router.navigate(['/404']);
        }
      });
    }
  }

  public setForm(hero: IHero): void {
    this.form.patchValue({ ...hero });
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    console.log(this.currentHero);

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe({
        next: (hero) => {
          this.showSnackBar(`${hero.superhero} updated!`);
        },
        error: (err) => console.log(err)
      });
      return;
    }

    this.heroService.addHero(this.currentHero).subscribe({
      next: (hero: IHero) => {
        this.showSnackBar(`${hero.superhero} added!`);
        this.router.navigate(['/heroes/edit/', hero.id]);
      },
      error: (err) => console.log(err)
    });
  }

  get currentHero(): IHero {
    return { ...this.form.value };
  }

  public onDeleteHero(): void {
    if (!this.currentHero.id) throw new Error('Hero id is required');

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { ...this.currentHero }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (!result) return;

        this.heroService.deleteHero(this.currentHero.id).subscribe({
          next: () => { this.router.navigate(['/heroes']) },
          error: (err) => console.log(err)
        });
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 2500
    })
  }

}
