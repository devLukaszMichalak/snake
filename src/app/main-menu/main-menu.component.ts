import { Component } from '@angular/core';
import { Pages } from '../routing/pages';
import { MenuButtonComponent } from '../common/ui/menu-button/menu-button.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    MenuButtonComponent
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  
  protected readonly Pages = Pages;
}
