import { computed, Injectable, Signal, signal } from '@angular/core';
import { Board } from './board';
import { Direction } from './direction';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  
  private readonly _board = signal(new Board());
  private readonly _direction = signal(Direction.RIGHT);
  
  get directionChange(): Observable<Direction> {
    return toObservable(this._direction);
  }
  
  get board(): Signal<Board> {
    return computed(() => this._board());
  }
  
  get direction(): Signal<Direction> {
    return computed(() => this._direction());
  }
  
  set direction(direction: Direction) {
    this._direction.set(direction);
  }
  
  reset = (): void => {
    this._board.set(new Board());
    this._direction.set(Direction.RIGHT);
  };
  
  move(): void {
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
