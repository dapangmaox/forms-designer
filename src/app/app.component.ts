import { Component } from '@angular/core';
import { FormElementsMenuComponent } from './components/form-elements-menu/form-elements-menu.component';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';
import { FieldSettingsComponent } from './components/field-settings/field-settings.component';

@Component({
  selector: 'app-root',
  imports: [
    FormElementsMenuComponent,
    MainCanvasComponent,
    FieldSettingsComponent,
  ],
  template: `
    <div class="flex flex-col h-screen bg-gray-100 px-4">
      <div class="flex flex-col gap-1 items-center justify-center py-10">
        <h1 class="text-2xl tracking-wide font-medium">
          Angular Forms Designer
        </h1>
        <p class="text-gray-500">
          Create beautiful, responsive forms with Angular Material and
          TailwindCSS
        </p>
      </div>
      <div class="flex gap-4">
        <app-form-elements-menu class="w-64" />
        <app-main-canvas class="flex-1" />
        <app-field-settings class="w-64 " />
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
