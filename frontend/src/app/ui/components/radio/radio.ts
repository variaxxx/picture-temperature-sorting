import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export interface RadioOption {
  label: string;
  value: string;
}

@Component({
  selector: "app-radio",
  imports: [],
  templateUrl: "./radio.html",
  styles: ":host {display: block;}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Radio),
      multi: true,
    },
  ],
})
export class Radio implements ControlValueAccessor {
  valueOptions = input.required<RadioOption[]>();

  value = signal<string | null>(null);

  select(value: string): void {
    this.value.set(value);
    this.onChange(this.value());
    this.onTouched();
  }

  writeValue(obj: string): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (value: any): any => {};
  onTouched = (): any => {};
}
