import { collageGuard } from "./common/guards/collage-guard";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home").then(c => c.Home),
    title: "Sorting pictures by temperature",
  },
  {
    path: "collage",
    loadComponent: () => import("./pages/collage-page/collage-page").then(c => c.CollagePage),
    title: "Generated collage",
    canActivate: [collageGuard],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
