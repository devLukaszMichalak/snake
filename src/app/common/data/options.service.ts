import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { Difficulty } from './difficulty';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  
  public static CAN_PASS_THROUGH_WALLS = true;
  
  _difficulty = signal(Difficulty.EASY);
  _canPassThroughWalls = signal(OptionsService.CAN_PASS_THROUGH_WALLS);
  
  constructor() {
    effect(() => {
      console.log("dsa")
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
  
  get currentGameOptionsObject() {
    return {difficulty: this.difficulty(), canPassThroughWalls: this.canPassThroughWalls()}
  }
  
}
