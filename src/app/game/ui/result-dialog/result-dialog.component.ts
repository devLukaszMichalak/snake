import { Component, effect, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.scss'
})
export class ResultDialogComponent {
  
  @Input() text!: string;
  @Input() showHideDialog!: Signal<boolean>;
  
  constructor() {
    effect(() => {
      const dialog = document.querySelector("dialog");
      
      if (this.showHideDialog()) {
        dialog?.showModal();
        const closeButton = document.querySelector('dialog button');
        closeButton?.addEventListener('click', () => {
          dialog?.close();
        });
        
      } else {
        dialog?.close()
      }
    });
  }
  
}
