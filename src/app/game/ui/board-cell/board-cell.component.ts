import { Component, Input } from '@angular/core';
import { Occupant } from '../../data/occupant';
import { Row } from '../../data/row';
import { Column } from '../../data/column';

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
  
  protected readonly Occupant = Occupant;
  
  isRowOdd() {
    return this.row % 2 !== 0;
  }
  
  isColumnOdd() {
    return this.column % 2 !== 0;
  }
}
