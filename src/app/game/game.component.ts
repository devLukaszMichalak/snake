import { Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { BoardComponent } from './ui/board/board.component';
import { BoardService } from './data/board.service';
import { Direction } from './data/direction';
import { takeWhile, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResultDialogComponent } from './ui/result-dialog/result-dialog.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    BoardComponent,
    ResultDialogComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  
  private boardService = inject(BoardService);
  private destroyRef = inject(DestroyRef);
  
  showHideDialog = signal(false);
  dialogText: string = '';
  
  ngOnInit() {
    timer(500, 500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(takeWhile(() => this.boardService.direction() !== Direction.NONE))
      .subscribe(time => {
        console.log(time);
        try {
          this.boardService.move();
          
        } catch (error) {
          this.boardService.direction = Direction.NONE;
          if (this.boardService.board().isWin()) {
            this.dialogText = `Congratulations! You won!.`;
          } else {
            this.dialogText = 'Game over!';
          }
          
          this.showHideDialog.set(true);
        }
      });
    
  }
  
  @HostListener('document:keydown', ['$event'])
  shortcuts(event: KeyboardEvent) {
    
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.boardService.direction = Direction.UP;
    }
    
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.boardService.direction = Direction.DOWN;
    }
    
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.boardService.direction = Direction.LEFT;
    }
    
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.boardService.direction = Direction.RIGHT;
    }
  }
  
}
