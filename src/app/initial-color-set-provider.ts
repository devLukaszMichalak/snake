import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { OptionsService } from './common/data/options/options.service';
import { COLORS } from './common/data/options/visual/colors';
import { ColorSet } from './common/data/options/visual/color-set';

export const provideInitialColorSet = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {provide: APP_INITIALIZER, useFactory: () => setUpInitColorSet, multi: true}
  ]);

const setUpInitColorSet = () => {
  const storedOptions = JSON.parse(localStorage.getItem(OptionsService.STORAGE_KEY) || '{}');
  const colorSet = storedOptions?.colorSet || COLORS.PINK_CREME;
  setColorSet(colorSet);
};

export const setColorSet = (colorSet: ColorSet) => {
  document.documentElement.style.setProperty('--easy', colorSet.easy);
  document.documentElement.style.setProperty('--easy-darker', colorSet.easyDarker);
  document.documentElement.style.setProperty('--hard', colorSet.hard);
  document.documentElement.style.setProperty('--hard-lighter', colorSet.hardLighter);
  document.documentElement.style.setProperty('--cosy', colorSet.cosy);
};
