import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home").then(m => m.Home),
    title: "Sorting pictures by temperature",
  },
  {
    path: "**",
    redirectTo: "",
  },
];
