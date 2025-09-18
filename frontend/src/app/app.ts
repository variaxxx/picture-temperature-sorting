import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: ":host { height: 100%; display: block; }",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal("frontend");
}
