import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || !Array.isArray(control.value)) {
      return { minArrayLength: { requiredLength: min, actualLength: 0 } };
    }

    const length = control.value.length;
    return length < min
      ? { minArrayLength: { requiredLength: min, actualLength: length } }
      : null;
  };
}
