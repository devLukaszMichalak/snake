import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { OptionsService } from '../../../common/data/options.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Difficulty } from '../../../common/data/difficulty';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type GameplayOptionsFormT = FormGroup<{
  difficulty: FormControl<Difficulty | null>,
  canPassThroughWalls: FormControl<boolean | null>
}>

@Component({
  selector: 'app-gameplay-options',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gameplay-options.component.html',
  styleUrl: './gameplay-options.component.scss'
})
export class GameplayOptionsComponent implements OnInit {
  
  private optionsService = inject(OptionsService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  
  protected readonly Difficulty = Difficulty;
  
  gameplayOptionsForm: GameplayOptionsFormT = this.formBuilder.group({
      difficulty: [Difficulty.EASY],
      canPassThroughWalls: [true]
    }
  );
  
  ngOnInit(): void {
    this.gameplayOptionsForm.patchValue(this.optionsService.currentGameOptionsObject);
    this.gameplayOptionsForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(formData => {
        if (formData.difficulty) {
          this.optionsService.difficulty = formData.difficulty;
        }
        if (formData.canPassThroughWalls) {
          this.optionsService.canPassThroughWalls = formData.canPassThroughWalls;
        }
      });
  }
  
}
