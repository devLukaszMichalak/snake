import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pages } from '../../../routing/pages';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuButtonComponent {
  
  route: InputSignal<Pages> = input.required();
  label: InputSignal<string> = input.required();
  
}

