import { Component, Input } from '@angular/core';
import { Pages } from '../../routing/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent {
  
  @Input() route!: Pages;
  @Input() label!: string;

}
