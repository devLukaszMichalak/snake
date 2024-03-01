import { computed, Injectable, Signal, signal } from '@angular/core';
import { Board } from './board';
import { Direction } from './direction';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  
  private readonly _board = signal(new Board());
  private readonly _direction = signal(Direction.LEFT);
  
  get board(): Signal<Board> {
    return computed(() => this._board());
  }
  
  get direction(): Signal<Direction> {
    return computed(() => this._direction());
  }
  
  set direction(direction: Direction) {
    this._direction.set(direction);
  }
  
  move() {
    switch (this._direction()) {
      case Direction.LEFT:
        this._board().moveLeft();
        break;
      case Direction.RIGHT:
        this._board().moveRight();
        break;
      case Direction.UP:
        this._board().moveUp();
        break;
      case Direction.DOWN:
        this._board().moveDown();
        break;
      case Direction.NONE:
      default:
        break;
    }
  }
  
}
