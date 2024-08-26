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
        <span (click)="toggleStar.emit()">⭐</span>
      } @else {
        <span (click)="toggleStar.emit()">☆</span>
      }  

      <span>{{ item.label }}</span>

      @if (item.status === 'pending') {
        <span (click)="moveToInProgress.emit()">🔒</span>
      }

      @if (item.inProgress) {
        <span (click)="moveToDone.emit()">✓</span>
      }
      
      <span (click)="remove.emit()">&#x274C;</span>
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
