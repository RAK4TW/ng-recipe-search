import { Component, signal, computed } from '@angular/core'; // Don't forge
'computed'

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
         <h2>Counter Component</h2>
         <p>Current count: {{ count() }}</p>
        <p>Is count even? {{ isEven() }}</p>
       <button (click)="increment()"> + </button>
        <button (click)="decrement()"> - </button>
      `,
})
export class Counter {
  protected readonly count = signal(0);
  protected readonly isEven = computed(() => this.count() % 2 === 0);

  protected increment(): void {
    this.count.update(value => value + 1);
  }

  protected decrement(): void {
    this.count.update(value => value - 1);
  }
}
