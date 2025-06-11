import { Type } from '@angular/core';

export interface FieldTypeDefinition {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  settingsConfig: FieldSettingsDefinition[];
  component: Type<unknown>;
}

export interface FieldSettingsDefinition {
  type: 'text' | 'checkbox' | 'select';
  key: string;
  label: string;
  options?: OptionItem[];
}

export interface OptionItem {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string; // Optional, for fields like text input
  placeholder?: string; // Optional, for fields like text input
}
