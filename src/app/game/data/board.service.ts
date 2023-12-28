import { computed, Injectable, Signal, signal } from '@angular/core';
import { Board } from './board';
import { Direction } from './direction';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  
  private readonly currentBoardState = signal(new Board());
  
  private readonly currentDirection = signal(Direction.LEFT);
  
  get board(): Signal<Board> {
    return computed(() => this.currentBoardState());
  }
  
  get direction(): Signal<Direction> {
    return computed(() => this.currentDirection());
  }
  
  set direction(direction: Direction) {
    this.currentDirection.set(direction);
  }
  
  move() {
    switch (this.currentDirection()) {
      case Direction.LEFT:
        this.currentBoardState().moveLeft();
        break;
      case Direction.RIGHT:
        this.currentBoardState().moveRight();
        break;
      case Direction.UP:
        this.currentBoardState().moveUp();
        break;
      case Direction.DOWN:
        this.currentBoardState().moveDown();
        break;
      case Direction.NONE:
      default:
        break;
    }
  }
  
}
