import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {
 @Input() isOpen: boolean;

 constructor() {
  setTimeout(()=>{
    this.isOpen = false
  }, 3000);
 }
}
