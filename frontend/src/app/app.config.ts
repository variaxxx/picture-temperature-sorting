import { routes } from "./app.routes";
import { ErrorHandlerService } from "./error-handler.service";
import { iconsConfig, IconService } from "./ui/components/icon/icon.service";
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { firstValueFrom } from "rxjs";

export function appInit() {
  const icon = inject(IconService);
  return firstValueFrom(icon.initIcons(iconsConfig));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(appInit),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
