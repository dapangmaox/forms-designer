import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

import { FieldTypesService } from '../../services/field-types.service';
import { FieldButtonComponent } from './field-button/field-button.component';

@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButtonComponent, DragDropModule],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    >
      <h3 class="text-xl font-medium mb-4">Form Elements</h3>
      <div
        class="flex flex-col gap-4 elements-menu"
        cdkDropList
        cdkDropListSortingDisabled="true"
        [cdkDropListData]="'field-selector'"
        [cdkDropListEnterPredicate]="noDropAllowed"
      >
        @for (type of fieldTypes; track type.type) {
          <app-field-button [field]="type" />
        }
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormElementsMenuComponent {
  fieldTypesService = inject(FieldTypesService);

  fieldTypes = this.fieldTypesService.getAllFieldTypes();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  noDropAllowed(_item: CdkDrag<any>) {
    return false;
  }
}
