import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap, throwError } from 'rxjs';
import { addDoc, arrayRemove, arrayUnion, collection, collectionData, CollectionReference, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';

import { Todo } from './todo';
import { makeTodo } from './make-todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todosCollection: CollectionReference<Todo>;

  constructor(firestore: Firestore) {
    this.todosCollection = collection(firestore, 'todos') as CollectionReference<Todo>;
  }

  public getTodos() {
    return (collectionData(this.todosCollection) as Observable<Todo[]>).pipe(
      map((todos: Todo[]) => todos
          .sort((a, b) => b.stars.length - a.stars.length)
          .sort((a, b) => (b.status === 'done' ? 0 : 1) - (a.status === 'done' ? 0 : 1)))
    );
  }

  public addTodo(todo: Todo) {
    return from(addDoc(this.todosCollection, todo)).pipe(
      switchMap((docRef) => updateDoc(docRef, {
        id: docRef.id
      }))
    );
  }

  public toggleStar(todo: Todo, userId: string) {
    const stars = todo.stars.includes(userId)
        ? arrayRemove(userId)
        : arrayUnion(userId)

    return from(updateDoc(doc(this.todosCollection, todo.id), {
      stars
    }));
  }

  public moveTodoToInProgress(todo: Todo, userId: string) {
    // check task is pending
    if (todo.status !== 'pending') {
      return throwError(() => new Error('Task is not pending'));
    }

    return from(updateDoc(doc(this.todosCollection, todo.id), {
      status: 'in-progress',
      lastUpdatedBy: userId
    }));
  }

  public moveTodoToDone(todo: Todo, userId: string) {
    // check task is pending
    if (todo.status !== 'in-progress' || todo.lastUpdatedBy !== userId) {
      return throwError(() => new Error('Task is not in-progress or in-progress by someone else'));
    }

    return from(updateDoc(doc(this.todosCollection, todo.id), {
      status: 'done',
      lastUpdatedBy: userId
    }));
  }

  public removeTodo(todo: Todo) {
    return from(deleteDoc(doc(this.todosCollection, todo.id)));
  }
}
