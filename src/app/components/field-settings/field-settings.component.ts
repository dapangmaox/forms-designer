import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { FieldTypesService } from '../../services/field-types.service';

@Component({
  selector: 'app-field-settings',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
  ],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    >
      @if (formService.selectedField(); as selectedField) {
        <h3 class="text-xl font-medium mb-6">Field Properties</h3>
        <div class="flex flex-col gap-6">
          @for (setting of fieldSettings(); track setting.key) {
            @switch (setting.type) {
              @case ('text') {
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>{{ setting.label }}</mat-label>
                  <input
                    matInput
                    [ngModel]="fieldValues()[setting.key]"
                    (ngModelChange)="
                      updateField(selectedField.id, setting.key, $event)
                    "
                  />
                </mat-form-field>
              }
              @case ('checkbox') {
                <div class="flex items-center">
                  <mat-checkbox
                    [ngModel]="fieldValues()[setting.key]"
                    (ngModelChange)="
                      updateField(selectedField.id, setting.key, $event)
                    "
                  >
                    {{ setting.label }}
                  </mat-checkbox>
                </div>
              }
              @case ('select') {
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>{{ setting.label }}</mat-label>
                  <mat-select
                    [ngModel]="fieldValues()[setting.key]"
                    (ngModelChange)="
                      updateField(selectedField.id, setting.key, $event)
                    "
                  >
                    @for (option of setting.options; track option.value) {
                      <mat-option [value]="option.value">
                        {{ option.label }}
                      </mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }
            }
          }
        </div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSettingsComponent {
  formService = inject(FormService);
  fieldTypesService = inject(FieldTypesService);

  fieldSettings = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return [];

    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    return fieldDef?.settingsConfig || [];
  });

  fieldValues = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return {};

    return field as any;
  });

  updateField(fieldId: string, key: string, value: any) {
    this.formService.updateField(fieldId, {
      [key]: value,
    });
  }
}
