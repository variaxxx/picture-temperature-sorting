import { ChangeDetectionStrategy, Component, input } from "@angular/core";

export type ButtonType = "submit" | "button";
export type ButtonPriority = "primary" | "secondary";

@Component({
  selector: "app-button",
  imports: [],
  templateUrl: "./button.html",
  styleUrl: "./button.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  type = input<ButtonType>("button");
  priority = input<ButtonPriority>("primary");
}
