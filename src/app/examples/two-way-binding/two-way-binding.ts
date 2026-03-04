import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Must import FormsModule

@Component({
  selector: 'app-name-tag',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './two-way-binding.html',
})
export class NameTag {
  protected readonly name = signal(''); // A writable signal
}