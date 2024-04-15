import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { Difficulty } from './gameplay/difficulty';
import { GameplayOptions } from './gameplay/gameplay-options';
import { COLORS } from './visual/colors';
import { VisualOptions } from './visual/visual-options';
import { ColorSet } from './visual/color-set';
import { setColorSet } from '../../../initial-color-set-provider';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  
  static readonly STORAGE_KEY = 'snake-options';
  
  private static _CAN_PASS_THROUGH_WALLS = true;
  
  private _difficulty = signal(Difficulty.EASY);
  private _colorSet = signal(COLORS.PINK_CREME);
  private _canPassThroughWalls = signal(OptionsService._CAN_PASS_THROUGH_WALLS);
  
  private optionsToStore = computed(() => ({
    difficulty: this._difficulty(),
    colorSet: this._colorSet(),
    canPassThroughWalls: this._canPassThroughWalls()
  }));
  
  constructor() {
    const storedOptions = JSON.parse(localStorage.getItem(OptionsService.STORAGE_KEY) || '{}');
    if (storedOptions) {
      this._difficulty.set(storedOptions.difficulty || Difficulty.EASY);
      this._colorSet.set(storedOptions.colorSet || COLORS.PINK_CREME);
      this._canPassThroughWalls.set(storedOptions.canPassThroughWalls ?? OptionsService._CAN_PASS_THROUGH_WALLS);
    }
    
    effect(() => {
      setColorSet(this._colorSet());
    });
    
    effect(() => {
      OptionsService._CAN_PASS_THROUGH_WALLS = this._canPassThroughWalls();
    });
    
    effect(() => {
      localStorage.setItem(OptionsService.STORAGE_KEY, JSON.stringify(this.optionsToStore()));
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
  }
  
}
