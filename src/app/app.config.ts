import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './routing/app.routes';
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { HammerConfig } from './hammer-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HammerModule),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ]
};
