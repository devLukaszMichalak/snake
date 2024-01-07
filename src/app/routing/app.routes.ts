import { Routes } from '@angular/router';
import { Pages } from './routes';

export const routes: Routes = [
  {
    path: Pages.MENU,
    loadComponent: () => import('../main-menu/main-menu.component').then(mod => mod.MainMenuComponent)
  },
  {
    path: Pages.ABOUT,
    loadComponent: () => import('../about/about.component').then(mod => mod.AboutComponent)
  },
  {
    path: Pages.OPTIONS,
    loadComponent: () => import('../options/options.component').then(mod => mod.OptionsComponent),
    children: [
      {
        path: Pages.GAMEPLAY,
        loadComponent: () => import('../options/children/gameplay-options/gameplay-options.component').then(mod => mod.GameplayOptionsComponent)
      },
      {
        path: Pages.VISUAL,
        loadComponent: () => import('../options/children/visual-options/visual-options.component').then(mod => mod.VisualOptionsComponent)
      }
    ]
  },
  {
    path: Pages.GAME,
    loadComponent: () => import('../game/game.component').then(mod => mod.GameComponent)
  },
  {
    path: '',
    redirectTo: Pages.MENU, pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: Pages.MENU, pathMatch: 'full'
  }
];