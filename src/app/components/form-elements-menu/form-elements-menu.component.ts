import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types.service';
import { FieldButtonComponent } from './field-button/field-button.component';

@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButtonComponent],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm flex flex-col gap-4"
    >
      <h3 class="text-xl font-medium">Form Elements</h3>
      @for (type of fieldTypes; track type.type) {
        <app-field-button [field]="type" />
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormElementsMenuComponent {
  fieldTypesService = inject(FieldTypesService);

  fieldTypes = this.fieldTypesService.getAllFieldTypes();
}
