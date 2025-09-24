import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Observable, tap, zip } from "rxjs";

export interface IconsConfig {
  assetsPath: string;
  icons: string[];
}

export const iconsConfig: IconsConfig = {
  assetsPath: "assets/icons",
  icons: [
    "upload",
    "picture",
    "close",
  ],
};

@Injectable({ providedIn: "root" })
export class IconService {
  private readonly httpClient = inject(HttpClient);
  private readonly domSanitizer = inject(DomSanitizer);

  private config!: IconsConfig;
  private icons: Record<string, SafeHtml> = {};

  registerIcon(icon: string): Observable<any> {
    return this.httpClient.get(`${this.config.assetsPath}/${icon}.svg`, { responseType: "text" }).pipe(
      tap((svg) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, "image/svg+xml");

        const els = doc.querySelectorAll("*");
        for (const el of els) {
          el.removeAttribute("fill");
          el.removeAttribute("stroke");
          el.removeAttribute("width");
          el.removeAttribute("height");
        }

        const xml = new XMLSerializer();
        const modified = xml.serializeToString(doc.documentElement);
        const safe = this.domSanitizer.bypassSecurityTrustHtml(modified);

        this.icons[icon] = safe;
      }),
    );
  }

  initIcons(config: IconsConfig): Observable<void[]> {
    this.config = config;
    return zip(
      config.icons.map(icon => this.registerIcon(icon)),
    ).pipe(tap(() => {
      console.log("Icons initialized");
    }));
  }

  get(icon: string): SafeHtml {
    return this.icons[icon];
  }
}
