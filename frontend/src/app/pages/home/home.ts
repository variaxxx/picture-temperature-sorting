import { ApiService } from "../../common/services/api.service";
import { Button } from "../../ui/components/button/button";
import { Input } from "../../ui/components/input/input";
import { Radio, RadioOption } from "../../ui/components/radio/radio";
import { FilesField } from "./components/files-field/files-field";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";

export enum MethodOption {
  TANNER_HELLAND = "TH",
  MODIFIED_TH = "modifiedTH",
  MC_CAMY = "mcCamy",
}

export enum OrderOption {
  WARM_FIRST = "warmFirst",
  COOL_FIRST = "coolFirst",
}

@Component({
  selector: "app-home",
  imports: [
    Input,
    ReactiveFormsModule,
    Button,
    Radio,
    FilesField,
  ],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly apiService = inject(ApiService);

  protected metodOptions: RadioOption[] = [
    {
      label: "Tanner Helland",
      value: MethodOption.TANNER_HELLAND,
    },
    {
      label: "Modified Tanner Helland",
      value: MethodOption.MODIFIED_TH,
    },
    {
      label: "McCamy",
      value: MethodOption.MC_CAMY,
    },
  ];

  protected orderOptions: Record<keyof typeof OrderOption, OrderOption> = {
    WARM_FIRST: OrderOption.WARM_FIRST,
    COOL_FIRST: OrderOption.COOL_FIRST,
  };

  form = new FormGroup({
    method: new FormControl<MethodOption>(MethodOption.TANNER_HELLAND, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    order: new FormControl<OrderOption>(OrderOption.WARM_FIRST, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    minTemp: new FormControl<number | null>(null, [Validators.min(0)]),
    maxTemp: new FormControl<number | null>(null, [Validators.min(0)]),
    files: new FormControl<File[]>([], {
      nonNullable: true,
    }),
  });

  changeOrder(option: OrderOption): void {
    this.form.controls.order.setValue(option);
  }

  resetForm(): void {
    this.form.reset();
  }

  get order(): OrderOption {
    return this.form.controls.order.value!;
  }

  onSubmit(): void {
    firstValueFrom(this.apiService.calculateTemp({
      method: this.form.controls.method.value,
      order: this.form.controls.order.value,
      files: this.form.controls.files.value,
      minTemp: this.form.controls.minTemp.value ?? undefined,
      maxTemp: this.form.controls.maxTemp.value ?? undefined,
    }));
    console.log(this.form.value);
  }
}
