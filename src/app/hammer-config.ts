import { HammerGestureConfig } from '@angular/platform-browser';

const DIRECTION_ALL = (window as any).Hammer.DIRECTION_ALL;

export class HammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: {direction: DIRECTION_ALL}
  };
}