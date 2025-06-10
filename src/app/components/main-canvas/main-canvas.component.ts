import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

@Component({
  selector: 'app-main-canvas',
  imports: [FormEditorComponent, MatButtonToggleModule, FormPreviewComponent],
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
}
