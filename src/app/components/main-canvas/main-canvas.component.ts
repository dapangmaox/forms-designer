import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-main-canvas',
  imports: [
    FormEditorComponent,
    MatButtonToggleModule,
    FormPreviewComponent,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    >
      <div class="pb-4 border-b border-gray-200 flex gap-2 items-center">
        <h3 class="text-xl font-medium">Main Canvas</h3>
        <mat-button-toggle-group
          [(value)]="activeTab"
          hideSingleSelectionIndicator="true"
        >
          <mat-button-toggle value="editor">Editor</mat-button-toggle>
          <mat-button-toggle value="preview">Preview</mat-button-toggle>
        </mat-button-toggle-group>

        @if (activeTab() === 'editor') {
          <div class="flex-1"></div>
          <button mat-flat-button (click)="formService.addRow()">
            Add Row
            <mat-icon>add_circle</mat-icon>
          </button>
        }
      </div>

      @if (activeTab() === 'editor') {
        <app-form-editor />
      } @else {
        <app-form-preview />
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCanvasComponent {
  activeTab = signal<'editor' | 'preview'>('editor');

  formService = inject(FormService);
}
