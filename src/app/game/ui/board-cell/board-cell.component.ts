import { Component, inject, Input, Signal } from '@angular/core';
import { Row } from '../../data/board/row';
import { Column } from '../../data/board/column';
import { Occupant } from '../../data/board/occupant';
import { BoardService } from '../../data/board.service';
import { Direction } from '../../data/direction';

@Component({
  selector: 'app-board-cell',
  standalone: true,
  imports: [],
  templateUrl: './board-cell.component.html',
  styleUrl: './board-cell.component.scss'
})
export class BoardCellComponent {
  
  @Input() occupant!: Occupant;
  @Input() row!: Row;
  @Input() column!: Column;
  
  public direction: Signal<Direction> = inject(BoardService).direction
  
  protected readonly Occupant = Occupant;
  
  isRowOdd() {
    return this.row % 2 !== 0;
  }
  
  isColumnOdd() {
    return this.column % 2 !== 0;
  }
  
  protected readonly Direction = Direction;
}
