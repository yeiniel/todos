import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { Todo } from './todo';
import { makeTodo } from './make-todo';

@Component({
  selector: 'app-todos-new',
  standalone: true,
  imports: [],
  template: `
    <input type="text" placeholder="Enter a new todo" required (keydown.enter)="emitTodo($event)" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  @Output() public readonly todo = new EventEmitter<Todo>();

  protected emitTodo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.todo.emit(makeTodo(input.value));
    input.value = '';
  }
}
