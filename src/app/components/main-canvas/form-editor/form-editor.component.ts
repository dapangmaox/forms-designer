import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

import { FormService } from '../../../services/form.service';
import { FieldTypeDefinition, FormField } from '../../../models/field';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormFieldComponent],
  template: `
    <div class="p-4">
      @for (row of formService.rows(); track row.id) {
        <div
          cdkDropList
          (cdkDropListDropped)="onDropInRow($event, row.id)"
          [cdkDropListOrientation]="'mixed'"
          class="p-5 bg-white rounded-lg border-2 border-dashed border-gray-200"
        >
          <div>Row</div>
          <div class="flex gap-4 flex-wrap">
            @for (field of row.fields; track field.id) {
              <app-form-field class="flex-1" [field]="field" />
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEditorComponent {
  formService = inject(FormService);

  onDropInRow(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as FieldTypeDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        label: fieldType.label,
        ...fieldType.defaultConfig,
      };

      this.formService.addField(newField, rowId, event.currentIndex);
      return;
    }
  }
}
