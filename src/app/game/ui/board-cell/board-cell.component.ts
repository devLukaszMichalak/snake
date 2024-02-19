import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { Row } from '../../data/board/row';
import { Column } from '../../data/board/column';
import { Occupant } from '../../data/board/occupant';
import { BoardService } from '../../data/board.service';
import { Direction } from '../../data/direction';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-board-cell',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './board-cell.component.html',
  styleUrl: './board-cell.component.scss'
})
export class BoardCellComponent {
  
  row: InputSignal<Row> = input.required();
  occupant: InputSignal<Occupant> = input.required();
  column: InputSignal<Column> = input.required();
  
  direction: Signal<Direction> = inject(BoardService).direction;
  
  protected readonly Occupant = Occupant;
  protected readonly Direction = Direction;
  
  isRowOdd = () => this.row() % 2 !== 0;
  isColumnOdd = () => this.column() % 2 !== 0;
  
}
