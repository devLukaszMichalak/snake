import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, HostListener, inject, OnInit, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { BoardComponent } from './ui/board/board.component';
import { BoardService } from './data/board/board.service';
import { Direction } from './data/board/direction';
import { filter, takeUntil, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Pages } from '../routing/pages';
import { OptionsService } from '../common/data/options/options.service';
import { MenuButtonComponent } from '../common/ui/menu-button/menu-button.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    BoardComponent,
    MenuButtonComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  
  private boardService = inject(BoardService);
  private optionsService = inject(OptionsService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private changeDetectorRef = inject(ChangeDetectorRef);
  
  readonly Pages = Pages;
  
  dialog: Signal<ElementRef<HTMLDialogElement>> = viewChild.required('dialogElement');
  
  dialogText: WritableSignal<string> = signal('');
  
  private directionNone$ = this.boardService.directionChange
    .pipe(filter(direction => direction === Direction.NONE));
  
  ngOnInit() {
    timer(this.optionsService.difficulty(), this.optionsService.difficulty())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeUntil(this.directionNone$)
      )
      .subscribe(() => {
        try {
          this.boardService.move();
          this.changeDetectorRef.markForCheck();
          
        } catch (error) {
          this.endTheGame();
        }
      });
  }
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    
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
  
  onSwipe(event: unknown) {
    const hammerInput = event as HammerInput;
    
    if (Math.abs(hammerInput.deltaX) <= 40 && Math.abs(hammerInput.deltaY) <= 40) {
      return;
    }
    
    let direction: Direction;
    if (Math.abs(hammerInput.deltaX) > Math.abs(hammerInput.deltaY)) {
      direction = hammerInput.deltaX > 0 ? Direction.RIGHT : Direction.LEFT;
    } else {
      direction = hammerInput.deltaY > 0 ? Direction.DOWN : Direction.UP;
    }
    
    this.boardService.direction = direction;
  }
  
  closeDialog = () => {
    this.dialog().nativeElement.close();
    this.router.navigate(['/' + Pages.MENU])
      .then(() => this.boardService.reset());
  };
  
  private endTheGame() {
    this.boardService.direction = Direction.NONE;
    if (this.boardService.board().isWin()) {
      this.dialogText.set(`Congratulations! You won!.`);
    } else {
      this.dialogText.set('Game over!');
    }
    
    this.dialog().nativeElement.showModal();
  }
  
}
