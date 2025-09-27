import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

export type InputType = "text" | "number";

@Component({
  selector: "app-input",
  imports: [FormsModule],
  templateUrl: "./input.html",
  styles: ":host {display: block;}",
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
  protected value = signal<string | number | null>("");

  public type = input<InputType>("text");
  public invalidCondition = input<boolean>(false, { alias: "invalid" });

  onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;

    let val: number | string | null = raw;
    if (this.type() === "number") {
      val = raw === "" ? null : Number(raw);
    }

    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: string | number | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (value: string | number | null): any => {};
  onTouched = (): any => {};
}
