import { HammerGestureConfig } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: {direction: Hammer.DIRECTION_ALL}
  };
}
