import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Item } from './item';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todos-list-item',
  standalone: true,
  imports: [NgClass],
  template: `
    <li [ngClass]="item.status">
      @if (item.starred) {
        <button (click)="toggleStar.emit()">⭐</button>
      } @else {
        <button (click)="toggleStar.emit()">☆</button>
      }  

      <span>{{ item.label }}</span>

      @if (item.status === 'pending') {
        <button (click)="moveToInProgress.emit()">🔒</button>
      }

      @if (item.inProgress) {
        <button (click)="moveToDone.emit()">✓</button>
      }
      
      <button (click)="remove.emit()">&#x274C;</button>
    </li>
  `,
  styles: `
    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }

    li.done {
      text-decoration: line-through;
    }

    li.in-progress {
      font-weight: bold;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input({ required: true }) public item!: Item;

  @Output() public readonly toggleStar = new EventEmitter<void>();

  @Output() public readonly remove = new EventEmitter<void>();

  @Output() public readonly moveToInProgress = new EventEmitter<void>();

  @Output() public readonly moveToDone = new EventEmitter<void>();
}
