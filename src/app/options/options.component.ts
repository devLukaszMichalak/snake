import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Pages } from '../routing/pages';
import { MenuButtonComponent } from '../common/ui/menu-button/menu-button.component';
import { provideBounceRouteAnimation } from '../common/utils/bounce-route-animation';
import { AnimatedOutletAbstractComponent } from '../common/utils/animated-outlet-abstract-component.component';

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
  animations: [provideBounceRouteAnimation({position: 'fixed', width: '50%'})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent extends AnimatedOutletAbstractComponent {
  
  protected readonly Pages = Pages;
}
