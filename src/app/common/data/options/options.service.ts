import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { Difficulty } from './difficulty';
import { GameplayOptions } from './gameplay-options';
import { COLORS } from './colors';
import { VisualOptions } from './visual-options';
import { ColorSet } from './color-set';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  
  public static CAN_PASS_THROUGH_WALLS = true;
  
  private _difficulty = signal(Difficulty.EASY);
  private _colorSet = signal(COLORS.PINK_CREME);
  private _canPassThroughWalls = signal(OptionsService.CAN_PASS_THROUGH_WALLS);
  
  constructor() {
    effect(() => {
      OptionsService.CAN_PASS_THROUGH_WALLS = this._canPassThroughWalls();
    });
  }
  
  get difficulty(): Signal<Difficulty> {
    return computed(() => this._difficulty());
  }
  
  set difficulty(difficulty: Difficulty) {
    this._difficulty.set(difficulty)
  }
  
  get canPassThroughWalls(): Signal<boolean> {
    return computed(() => this._canPassThroughWalls());
  }
  
  set canPassThroughWalls(canPassThroughWalls: boolean) {
    this._canPassThroughWalls.set(canPassThroughWalls)
  }
  
  get currentGameOptionsObject(): GameplayOptions {
    return {difficulty: this._difficulty(), canPassThroughWalls: this._canPassThroughWalls()}
  }
  
  get currentVisualOptionsObject(): VisualOptions {
    return {colorSetName: this._colorSet().name}
  }
  
  set colorSet(colors: ColorSet) {
    document.documentElement.style.setProperty('--easy',colors.easy)
    document.documentElement.style.setProperty('--easy-darker',colors.easyDarker)
    document.documentElement.style.setProperty('--hard',colors.hard)
    document.documentElement.style.setProperty('--hard-lighter',colors.hardLighter)
    document.documentElement.style.setProperty('--cosy',colors.cosy)
  }
  
}
