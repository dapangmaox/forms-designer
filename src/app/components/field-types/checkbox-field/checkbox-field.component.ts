import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormField } from '../../../models/field';

@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckboxModule],
  template: `
    <mat-checkbox [required]="field().required">
      {{ field().label }}
    </mat-checkbox>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFieldComponent {
  field = input.required<FormField>();
}
