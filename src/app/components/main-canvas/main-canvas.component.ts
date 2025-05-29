import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-canvas',
  imports: [],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm"
    ></div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCanvasComponent {}
