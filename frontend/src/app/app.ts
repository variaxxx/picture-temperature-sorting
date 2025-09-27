import { NotificationsStack } from "./ui/components/notification/components/notifications-stack/notifications-stack";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NotificationsStack],
  template: `<router-outlet></router-outlet> <app-notifications-stack></app-notifications-stack>`,
  styles: ":host { height: 100%; display: block; }",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
