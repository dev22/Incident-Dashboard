import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../shared/models/select-option.model';

export interface TextFieldConfig {
  readonly controlName: string;
  readonly label: string;
  readonly type: 'text';
}

export interface SelectFieldConfig<T extends string | number = string> {
  readonly controlName: string;
  readonly label: string;
  readonly type: 'select';
  readonly options: readonly SelectOption<T>[];
}

export type FieldConfig<T extends string | number = string> =
  | TextFieldConfig
  | SelectFieldConfig<T>;

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  public readonly config = input.required<FieldConfig>();
  public readonly form = input.required<FormGroup>();

  public getOptions(
    config: FieldConfig,
  ): readonly SelectOption<string | number>[] {
    return config.type === 'select' ? config.options : [];
  }
}
