import { iconsConfig, IconService } from "./icon.service";
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-icon",
  imports: [],
  template: "",
  styleUrl: "./icon.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[innerHtml]": "inner",
    "[class.filled]": "filled()",
  },
})
export class Icon {
  private readonly iconService = inject(IconService);

  icon = input.required<typeof iconsConfig.icons[number]>();
  filled = input(false, { transform: booleanAttribute });

  get inner(): SafeHtml {
    return this.iconService.get(this.icon());
  }
}
