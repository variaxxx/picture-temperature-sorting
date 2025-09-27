import { ApiService } from "../../common/services/api.service";
import { minArrayLength } from "../../common/validators/min-array-length.validator";
import { Button } from "../../ui/components/button/button";
import { Input } from "../../ui/components/input/input";
import { NotificationService } from "../../ui/components/notification/notification.service";
import { Radio, RadioOption } from "../../ui/components/radio/radio";
import { FilesField } from "./components/files-field/files-field";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, firstValueFrom, of, tap, timeout } from "rxjs";

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
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  protected awaitingResponse = signal<boolean>(false);

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
      validators: [minArrayLength(1)],
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
    if (!this.form.valid)
      return this.notificationService.show("error", "Incorrectly filled form");

    const payload = {
      method: this.form.controls.method.value,
      order: this.form.controls.order.value,
      files: this.form.controls.files.value,
      minTemp: this.form.controls.minTemp.value ?? undefined,
      maxTemp: this.form.controls.maxTemp.value ?? undefined,
    };

    this.awaitingResponse.set(true);
    firstValueFrom(this.apiService.calculateTemp(payload).pipe(
      timeout(15000),
      tap(() => {
        this.awaitingResponse.set(false);
        this.router.navigateByUrl("/collage");
      }),
      catchError((e) => {
        this.awaitingResponse.set(false);
        console.error(`Error while fetching API: ${e}`);
        this.notificationService.show("error", "Error sending request to server. Try again later.");
        return of(undefined);
      }),
    ));
  }
}
