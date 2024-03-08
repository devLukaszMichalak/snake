import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Pages } from '../routing/pages';
import { MenuButtonComponent } from '../common/ui/menu-button/menu-button.component';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MenuButtonComponent
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent {
  
  protected readonly Pages = Pages;
}
