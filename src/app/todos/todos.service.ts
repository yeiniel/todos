import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, take, throwError } from 'rxjs';

import { Todo } from './todo';
import { makeTodo } from './make-todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosSubject = new BehaviorSubject<Todo[]>([
    {
      ...makeTodo('Barrer la casa'),
      stars: ['yeiniel', 'susana']
    },
    {
      ...makeTodo('Lavar los platos'),
      stars: ['yeiniel', 'jj'],
      status: 'in-progress',
      lastUpdatedBy: 'susana'
    },
    {
      ...makeTodo('Aspirar el piso'),
      stars: ['yeiniel', 'susana'],
      status: 'done'
    },
  ]);

  public getTodos() {
    return this.todosSubject.asObservable().pipe(
      map(todos => todos
          .sort((a, b) => b.stars.length - a.stars.length)
          .sort((a, b) => (b.status === 'done' ? 0 : 1) - (a.status === 'done' ? 0 : 1))),
      delay(500)
    );
  }

  public addTodo(todo: Todo) {
    this.todosSubject.next([
      ...this.todosSubject.getValue(),
      todo
    ]);

    return this.todosSubject.asObservable().pipe(take(1));
  }

  public toggleStar(todo: Todo, userId: string) {
    const todos = this.todosSubject.getValue();
    const index = todos.findIndex(t => t.label === todo.label)!;

    todo = {
      ...todo,
      stars: todo.stars.includes(userId)
        ? todo.stars.filter(id => id !== userId)
        : [...todo.stars, userId]
    };

    this.todosSubject.next([
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index + 1)
    ]);

    return this.todosSubject.asObservable().pipe(take(1));
  }

  public moveTodoToInProgress(todo: Todo, userId: string) {
    const todos = this.todosSubject.getValue();
    const index = todos.findIndex(t => t.label === todo.label)!;

    // check task is pending
    if (todo.status !== 'pending') {
      return throwError(() => new Error('Task is not pending'));
    }

    todo = {
      ...todo,
      status: 'in-progress',
      lastUpdatedBy: userId
    };

    this.todosSubject.next([
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index + 1)
    ]);

    return this.todosSubject.asObservable().pipe(take(1));
  }

  public moveTodoToDone(todo: Todo, userId: string) {
    const todos = this.todosSubject.getValue();
    const index = todos.findIndex(t => t.label === todo.label)!;

    // check task is pending
    if (todo.status !== 'in-progress' || todo.lastUpdatedBy !== userId) {
      return throwError(() => new Error('Task is not in-progress or in-progress by someone else'));
    }

    todo = {
      ...todo,
      status: 'done',
      lastUpdatedBy: userId
    };

    this.todosSubject.next([
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index + 1)
    ]);

    return this.todosSubject.asObservable().pipe(take(1));
  }

  public removeTodo(todo: Todo) {
    const todos = this.todosSubject.getValue().filter(t => t.label !== todo.label);
    this.todosSubject.next(todos);

    return this.todosSubject.asObservable().pipe(take(1));
  }
}
