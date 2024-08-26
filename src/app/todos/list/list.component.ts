import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ListItemComponent } from './list-item.component';
import { Item } from './item';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [ListItemComponent],
  template: `
    <ul>
      @for (item of items; track $index) {
        <app-todos-list-item [item]="item" (toggleStar)="toggleStar.emit(item)" (moveToInProgress)="moveItemToInProgress.emit(item)" (moveToDone)="moveItemToDone.emit(item)" (remove)="removeItem.emit(item)" />
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input({ required: true }) public items!: Item[];

  @Output() public readonly toggleStar = new EventEmitter<Item>();

  @Output() public readonly removeItem = new EventEmitter<Item>();

  @Output() public readonly moveItemToInProgress = new EventEmitter<Item>();

  @Output() public readonly moveItemToDone = new EventEmitter<Item>();
}
