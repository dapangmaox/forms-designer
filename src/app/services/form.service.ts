import { Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();

  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        fields: [],
      },
    ]);
  }

  /**
   *
   * @param field form field to add
   * @param rowId ID of the row to add the field to
   * @param index position in the row to insert the field
   * @returns void
   */
  addField(field: FormField, rowId: string, index: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const updatedFields = [...row.fields];
        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }

        return { ...row, fields: updatedFields };
      }

      return row;
    });

    this._rows.set(newRows);
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      const updatedFields = row.fields.filter((field) => field.id !== fieldId);
      return { ...row, fields: updatedFields };
    });

    this._rows.set(newRows);
  }
}
