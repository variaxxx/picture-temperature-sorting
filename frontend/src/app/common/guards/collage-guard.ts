import { ApiService } from "../services/api.service";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const collageGuard: CanActivateFn = (route, state) => {
  const api = inject(ApiService);
  const router = inject(Router);

  if (api.hasResult())
    return true;

  return router.navigateByUrl("/");
};
