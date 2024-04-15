import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './routing/app.routes';
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { HammerConfig } from './hammer-config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideInitialColorSet } from './initial-color-set-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideInitialColorSet(),
    importProvidersFrom(HammerModule),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ]
};
