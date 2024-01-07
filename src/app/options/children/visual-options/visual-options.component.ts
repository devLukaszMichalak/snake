import { Component, inject } from '@angular/core';
import { OptionsService } from '../../../common/data/options.service';

@Component({
  selector: 'app-visual-options',
  standalone: true,
  imports: [],
  templateUrl: './visual-options.component.html',
  styleUrl: './visual-options.component.scss'
})
export class VisualOptionsComponent {
  
  private optionsService = inject(OptionsService);
  
}
