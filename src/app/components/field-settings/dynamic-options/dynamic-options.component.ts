import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { OptionItem } from '../../../models/field';

@Component({
  selector: 'app-dynamic-options',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <div>
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-gray-700">{{ title() }}</h3>
        <button mat-icon-button (click)="addOption()">
          <mat-icon>add_circle</mat-icon>
        </button>
      </div>
      <div class="flex flex-col gap-2 mb-4 mt-2">
        @for (option of options(); track option.value; let i = $index) {
          <div class="flex items-center">
            <mat-form-field appearance="outline" class="flex-1 compact">
              <input
                matInput
                [ngModel]="option.label"
                (ngModelChange)="updateOption(i, $event)"
              />
            </mat-form-field>
            <button mat-icon-button (click)="removeOption(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicOptionsComponent {
  title = input('');
  options = input.required<OptionItem[]>();
  optionsChange = output<OptionItem[]>();

  addOption() {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.push({
      label: `Option ${currentOptions.length + 1}`,
      value: `option${currentOptions.length + 1}`,
    });
    this.optionsChange.emit(newOptions);
  }

  removeOption(index: number) {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.splice(index, 1);
    this.optionsChange.emit(newOptions);
  }

  updateOption(index: number, newLabel: string) {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions[index] = {
      ...newOptions[index],
      label: newLabel,
    };
    this.optionsChange.emit(newOptions);
  }
}
