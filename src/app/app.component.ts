import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { provideBounceRouteAnimation } from './common/utils/bounce-route-animation';
import { AnimatedOutletAbstractComponent } from './common/utils/animated-outlet-abstract-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [provideBounceRouteAnimation({position: 'absolute'})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends AnimatedOutletAbstractComponent {
}
