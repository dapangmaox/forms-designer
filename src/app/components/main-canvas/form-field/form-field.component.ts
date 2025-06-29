import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormField } from '../../../models/field';
import { FormService } from '../../../services/form.service';
import { FieldPreviewComponent } from '../field-preview/field-preview.component';

@Component({
  selector: 'app-form-field',
  imports: [
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
    FieldPreviewComponent,
  ],
  template: `
    <div
      class="bg-white p-4 pt-1 rounded-lg shadow-sm border border-gray-200 hover:border-black cursor-pointer"
      [class]="
        formService.selectedField()?.id === field().id ? '!border-black' : ''
      "
      (click)="formService.setSelectedField(field().id)"
    >
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm">{{ field().type | titlecase }}</span>
        <button mat-icon-button (click)="deleteField($event)">
          <mat-icon class="mr-2">delete</mat-icon>
        </button>
      </div>
      <app-field-preview [field]="field()" />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  field = input.required<FormField>();

  formService = inject(FormService);

  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.deleteField(this.field().id);
  }
}
