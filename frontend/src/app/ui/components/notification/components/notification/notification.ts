import { Icon } from "../../../icon/icon";
import { NotificationItem } from "../../notification.service";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-notification",
  imports: [Icon],
  templateUrl: "./notification.html",
  styleUrl: "./notification.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.data-type]": "type",
  },
})
export class Notification {
  notification = input.required<NotificationItem>();

  get icon(): "close" | "warning" | "info" {
    switch (this.notification().type) {
      case "error":
        return "close";
      case "info":
        return "info";
      case "warning":
        return "warning";
    }
  }

  get title(): string {
    switch (this.notification().type) {
      case "error":
        return "Error";
      case "info":
        return "Info";
      case "warning":
        return "Warning";
    }
  }

  get type(): string {
    return this.notification().type;
  }
}
