import { Component } from '@angular/core';
import { MenuButtonComponent } from '../common/ui/menu-button/menu-button.component';
import { Pages } from '../routing/pages';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MenuButtonComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  
  protected readonly Pages = Pages;
}
