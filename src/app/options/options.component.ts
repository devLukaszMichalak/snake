import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Pages } from '../routing/routes';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent {
  
  protected readonly Pages = Pages;
}
