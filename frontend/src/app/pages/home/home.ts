import { Button } from "../../ui/components/button/button";
import { Input } from "../../ui/components/input/input";
import { Radio } from "../../ui/components/radio/radio";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

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
  ],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected metodOptions: Record<keyof typeof MethodOption, MethodOption> = {
    TANNER_HELLAND: MethodOption.TANNER_HELLAND,
    MODIFIED_TH: MethodOption.MODIFIED_TH,
    MC_CAMY: MethodOption.MC_CAMY,
  };

  protected orderOptions: Record<keyof typeof OrderOption, OrderOption> = {
    WARM_FIRST: OrderOption.WARM_FIRST,
    COOL_FIRST: OrderOption.COOL_FIRST,
  };

  form = new FormGroup({
    method: new FormControl<MethodOption>(this.metodOptions.TANNER_HELLAND),
    order: new FormControl<OrderOption>(this.orderOptions.WARM_FIRST),
    minTemp: new FormControl<number | undefined>(undefined),
    maxTemp: new FormControl<number | undefined>(undefined),
  });

  changeOrder(option: OrderOption): void {
    this.form.controls.order.setValue(option);
  }

  get order(): OrderOption {
    return this.form.controls.order.value!;
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
