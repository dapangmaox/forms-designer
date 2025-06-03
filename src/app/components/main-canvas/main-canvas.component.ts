import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormEditorComponent } from './form-editor/form-editor.component';

@Component({
  selector: 'app-main-canvas',
  imports: [FormEditorComponent],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    >
      <div class="pb-4 border-b border-gray-200">
        <h3 class="text-xl font-medium">Main Canvas</h3>
      </div>

      <app-form-editor />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCanvasComponent {}
