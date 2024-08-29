import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';

import { Todo } from './todo';
import { TodosService } from './todos.service';
import { ListComponent, Item } from './list';
import { NewComponent } from './new.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [AsyncPipe, ListComponent, NewComponent],
  template: `
    @if (items$ | async; as items) {
      <app-todos-new (todo)="addTodo($event)" />
      <app-todos-list [items]="items" (toggleStar)="toggleStar($event)" (moveItemToInProgress)="moveTodoToInProgress($event)" (moveItemToDone)="moveTodoToDone($event)" (removeItem)="removeTodo($event)" />
    } @else {
      <p>Loading...</p>
    }
  `,
  styles: ``
})
export class TodosComponent {
  private readonly userIdSubject = new BehaviorSubject<string | undefined>(undefined);

  @Input() public set userId(userId: string | undefined) {
    this.userIdSubject.next(userId);
  }

  protected items$!: Observable<Item[]>;

  constructor(private todosService: TodosService) {
    this.items$ = combineLatest([
      this.todosService.getTodos(),
      this.userIdSubject.asObservable().pipe(filter(userId => !!userId))
    ]).pipe(
      map(([todos, userId]: [Todo[], string | undefined]) => todos.map(todo => {
        const { stars } = todo;

        return {
          ...todo,
          starred: userId ? stars.includes(userId) : false,
          inProgress: todo.status === 'in-progress' && todo.lastUpdatedBy === userId
        } as Item;
      }))
    );
  }

  addTodo(todo: Todo) {
    this.todosService.addTodo(todo)
      .subscribe({ next: () => undefined, error: err => alert(err) });
  }

  toggleStar(item: Item) {
    this.todosService.toggleStar(item, this.userIdSubject.getValue()!)
      .subscribe({ next: () => undefined, error: err => alert(err) });
  }

  moveTodoToInProgress(item: Item) {
    this.todosService.moveTodoToInProgress(item, this.userIdSubject.getValue()!)
      .subscribe({ next: () => undefined, error: err => alert(err) });
  }

  moveTodoToDone(item: Item) {
    this.todosService.moveTodoToDone(item, this.userIdSubject.getValue()!)
      .subscribe({ next: () => undefined, error: err => alert(err) });
  }

  removeTodo(item: Item) {
    this.todosService.removeTodo(item)
      .subscribe({ next: () => undefined, error: err => alert(err) });
  }
}
