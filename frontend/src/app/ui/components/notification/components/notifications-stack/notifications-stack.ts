import { NotificationService } from "../../notification.service";
import { Notification } from "../notification/notification";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

@Component({
  selector: "app-notifications-stack",
  imports: [
    AsyncPipe,
    Notification,
  ],
  templateUrl: "./notifications-stack.html",
  styleUrl: "./notifications-stack.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsStack {
  private readonly notificationService = inject(NotificationService);
  readonly notifications$ = this.notificationService.notifications$;
}
