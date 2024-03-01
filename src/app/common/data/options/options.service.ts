import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { Difficulty } from './gameplay/difficulty';
import { GameplayOptions } from './gameplay/gameplay-options';
import { COLORS } from './visual/colors';
import { VisualOptions } from './visual/visual-options';
import { ColorSet } from './visual/color-set';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  
  private static _CAN_PASS_THROUGH_WALLS = true;
  
  private _difficulty = signal(Difficulty.EASY);
  private _colorSet = signal(COLORS.PINK_CREME);
  private _canPassThroughWalls = signal(OptionsService._CAN_PASS_THROUGH_WALLS);
  
  constructor() {
    effect(() => {
      OptionsService._CAN_PASS_THROUGH_WALLS = this._canPassThroughWalls();
    });
  }
  
  static get CAN_PASS_THROUGH_WALLS(): boolean {
    return this._CAN_PASS_THROUGH_WALLS;
  }
  
  get difficulty(): Signal<Difficulty> {
    return computed(() => this._difficulty());
  }
  
  set difficulty(difficulty: Difficulty) {
    this._difficulty.set(difficulty);
  }
  
  get canPassThroughWalls(): Signal<boolean> {
    return computed(() => this._canPassThroughWalls());
  }
  
  set canPassThroughWalls(canPassThroughWalls: boolean) {
    this._canPassThroughWalls.set(canPassThroughWalls);
  }
  
  get currentGameOptionsObject(): GameplayOptions {
    return {difficulty: this._difficulty(), canPassThroughWalls: `${this._canPassThroughWalls()}`};
  }
  
  get currentVisualOptionsObject(): VisualOptions {
    return {colorSetName: this._colorSet().name};
  }
  
  set colorSet(colors: ColorSet) {
    this._colorSet.set(colors);
    document.documentElement.style.setProperty('--easy', colors.easy);
    document.documentElement.style.setProperty('--easy-darker', colors.easyDarker);
    document.documentElement.style.setProperty('--hard', colors.hard);
    document.documentElement.style.setProperty('--hard-lighter', colors.hardLighter);
    document.documentElement.style.setProperty('--cosy', colors.cosy);
  }
  
}
