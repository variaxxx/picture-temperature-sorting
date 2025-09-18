import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-radio",
  imports: [],
  templateUrl: "./radio.html",
  styleUrl: "./radio.scss",
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
  valueOption = input.required<string>();
  name = input.required<string>();

  value = signal<string | null>(null);

  select(): void {
    this.value.set(this.valueOption());
    this.onChange(this.value());
    this.onTouched();
  }

  writeValue(obj: any): void {
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
