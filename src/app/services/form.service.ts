import { computed, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';
import { FieldTypesService } from './field-types.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  fieldTypeService = inject(FieldTypesService);

  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);

  public readonly rows = this._rows.asReadonly();
  public readonly selectedField = computed(() =>
    this._rows()
      .flatMap((row) => row.fields)
      .find((field) => field.id === this._selectedFieldId()),
  );

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

  addRow() {
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();
    this._rows.set([...rows, newRow]);
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }

    const rows = this._rows();
    const newRows = rows.filter((row) => row.id !== rowId);
    this._rows.set(newRows);
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1,
  ) {
    const rows = this._rows();

    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    // Find the field to move and its source row
    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex(
          (field) => field.id === fieldId,
        );
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) return;

    // Remove the field from row
    const newRows = [...rows];
    const fieldsWithRemovedField = newRows[sourceRowIndex].fields.filter(
      (field) => field.id !== fieldId,
    );
    newRows[sourceFieldIndex].fields = fieldsWithRemovedField;

    const targetRowIndex = newRows.findIndex((row) => row.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }

    this._rows.set(newRows);
  }

  setSelectedField(fieldId: string) {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, ...data };
        }
        return field;
      }),
    }));
    this._rows.set(newRows);
  }

  moveRowUp(rowId: string) {
    const rows = this._rows();
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    if (rowIndex > 0) {
      const newRows = [...rows];
      const temp = newRows[rowIndex - 1];
      newRows[rowIndex - 1] = newRows[rowIndex];
      newRows[rowIndex] = temp;
      this._rows.set(newRows);
    }
  }

  moveRowDown(rowId: string) {
    const rows = this._rows();
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    if (rowIndex < rows.length - 1) {
      const newRows = [...rows];
      const temp = newRows[rowIndex + 1];
      newRows[rowIndex + 1] = newRows[rowIndex];
      newRows[rowIndex] = temp;
      this._rows.set(newRows);
    }
  }

  // Export functionality
  exportForm() {
    const formCode = this.generateFormCode();
    console.log(formCode);
  }

  generateFormCode() {
    let code = '';
    code += this.generateImports();
    code += this.generateComponentDecorator();
    code += `  template: \`\n`;
    code += `    <form class="flex flex-col gap-4">\n`;

    for (const row of this._rows()) {
      if (row.fields.length > 0) {
        code += `<div class="flex gap-4 flex-wrap">\n`;
        for (const field of row.fields) {
          code += `<div class="flex-1">\n`;
          code += this.generateFieldCode(field);
          code += `</div>\n`;
        }
        code += `</div>\n`;
      }
    }

    code += `    </form>\n`;
    code += `\`\n`;
    code += `})\n`;
    code += `export class DynamicFormComponent {\n`;
    code += `  // Component logic goes here\n`;
    code += `}\n`;
    code += `\n`;

    return code;
  }

  generateFieldCode(field: FormField) {
    const fieldDef = this.fieldTypeService.getFieldType(field.type);
    return fieldDef?.generateCode(field) || '';
  }

  generateImports() {
    return (
      `import { Component } from '@angular/core';\n` +
      `import { CommonModule } from '@angular/common';\n` +
      `import { FormsModule } from '@angular/forms';\n` +
      `import { MatFormFieldModule } from '@angular/material/form-field';\n` +
      `import { MatInputModule } from '@angular/material/input';\n` +
      `import { MatSelectModule } from '@angular/material/select';\n` +
      `import { MatCheckboxModule } from '@angular/material/checkbox';\n` +
      `import { MatRadioModule } from '@angular/material/radio';\n` +
      `import { MatIconModule } from '@angular/material/icon';\n` +
      `import { MatButtonModule } from '@angular/material/button';\n` +
      `\n`
    );
  }

  generateComponentDecorator() {
    return (
      `@Component({\n` +
      `  selector: 'app-dynamic-form',\n` +
      `  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatIconModule, MatButtonModule],\n`
    );
  }
}
