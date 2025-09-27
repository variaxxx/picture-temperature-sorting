import { NotificationService } from "./ui/components/notification/notification.service";
import { ErrorHandler, inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ErrorHandlerService implements ErrorHandler {
  private readonly notification = inject(NotificationService);

  handleError(error: any): void {
    this.notification.show("error", "Something went wrong");
    console.error(`An error occurred: ${error instanceof Error ? error.message : error}`);
  }
}
