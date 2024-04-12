import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { OptionsService } from '../../../common/data/options/options.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { COLORS } from '../../../common/data/options/visual/colors';
import { ColorSetName } from '../../../common/data/options/visual/color-set';

type VisualOptionsForm = FormGroup<{
  colorSetName: FormControl<ColorSetName | null>,
}>

@Component({
  selector: 'app-visual-options',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './visual-options.component.html',
  styleUrl: './visual-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualOptionsComponent implements OnInit {
  
  private optionsService = inject(OptionsService);
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);
  
  protected readonly ColorSetName = ColorSetName;
  
  visualOptionsForm: VisualOptionsForm = this.formBuilder.group({
      colorSetName: [ColorSetName.GREENISH]
    }
  );
  
  ngOnInit(): void {
    this.visualOptionsForm.patchValue(this.optionsService.currentVisualOptionsObject);
    this.visualOptionsForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(formData => {
        
        switch (formData.colorSetName) {
          case ColorSetName.PINK_CREME:
            this.optionsService.colorSet = COLORS.PINK_CREME;
            break;
          case ColorSetName.GREENISH:
            this.optionsService.colorSet = COLORS.GREENISH;
            break;
        }
        
      });
  }
  
}
