import { Component } from '@angular/core';
import { MenuButtonComponent } from './ui/menu-button.component';
import { Pages } from '../routing/routes';

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
