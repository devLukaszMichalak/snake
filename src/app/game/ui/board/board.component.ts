import { Component, inject, Signal } from '@angular/core';
import { BoardService } from '../../data/board/board.service';
import { BoardCellComponent } from '../board-cell/board-cell.component';
import { Board } from '../../data/board/board';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    BoardCellComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  
  board: Signal<Board> = inject(BoardService).board;
}
