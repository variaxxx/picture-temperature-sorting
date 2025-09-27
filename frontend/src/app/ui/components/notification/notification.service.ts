import { Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";

export type NotificationType = "info" | "warning" | "error";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  private counter = 0;
  private notifications = signal<NotificationItem[]>([]);
  readonly notifications$ = toObservable(this.notifications);

  show(
    type: NotificationType,
    message: string,
    timer: number = 3000,
  ): void {
    const id = ++this.counter;
    const notification: NotificationItem = {
      id,
      type,
      message,
    };

    this.notifications.set([...this.notifications(), notification]);

    if (timer) {
      setTimeout(() => this.dismiss(id), timer);
    }
  }

  dismiss(
    id: number,
  ): void {
    this.notifications.set(
      this.notifications()
        .filter(i => i.id !== id),
    );
  }
}
