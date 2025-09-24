import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-notification",
  imports: [],
  templateUrl: "./notification.html",
  styleUrl: "./notification.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notification {

}
