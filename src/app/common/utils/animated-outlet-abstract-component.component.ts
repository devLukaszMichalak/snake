import { RouterOutlet } from '@angular/router';

export abstract class AnimatedOutletAbstractComponent {
  
  prepareOutletAnimation = (outlet: RouterOutlet) =>
    outlet.isActivated ? outlet.activatedRoute : undefined;
}
