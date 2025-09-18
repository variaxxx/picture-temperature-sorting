import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type InputType = "text" | "number";

@Component({
  selector: "app-input",
  imports: [],
  templateUrl: "./input.html",
  styleUrl: "./input.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  protected value = signal<string>("");
  public type = input<InputType>("text");

  writeValue(value: string): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (value: string): any => {};
  onTouched = (): any => {};
}
