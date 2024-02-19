import { Component, DestroyRef, HostListener, inject, OnInit } from '@angular/core';
import { BoardComponent } from './ui/board/board.component';
import { BoardService } from './data/board.service';
import { Direction } from './data/direction';
import { takeWhile, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Pages } from '../routing/pages';
import { OptionsService } from '../common/data/options.service';
import { MenuButtonComponent } from '../common/ui/menu-button/menu-button.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    BoardComponent,
    MenuButtonComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  
  private boardService = inject(BoardService);
  private optionsService = inject(OptionsService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  
  dialogText: string = '';
  
  ngOnInit() {
    timer(this.optionsService.difficulty(), this.optionsService.difficulty())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(takeWhile(() => this.boardService.direction() !== Direction.NONE))
      .subscribe(() => {
        try {
          this.boardService.move();
          
        } catch (error) {
          this.boardService.direction = Direction.NONE;
          if (this.boardService.board().isWin()) {
            this.dialogText = `Congratulations! You won!.`;
          } else {
            this.dialogText = 'Game over!';
          }
          
          this.showDialog();
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
  
  onSwipe(event: any) {
    if (Math.abs(event.deltaX) <= 40 && Math.abs(event.deltaY) <= 40) {
      return;
    }
    
    let direction: Direction;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      direction = event.deltaX > 0 ? Direction.RIGHT : Direction.LEFT;
    } else {
      direction = event.deltaY > 0 ? Direction.DOWN : Direction.UP;
    }
    
    this.boardService.direction = direction;
  }
  
  private showDialog() {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
    
    const closeButton = document.querySelector('dialog button');
    closeButton?.addEventListener('click', () => {
      dialog?.close();
      this.router.navigate(['/' + Pages.MENU]).then();
    });
  }
  
  protected readonly Pages = Pages;
}
