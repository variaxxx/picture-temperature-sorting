import { ApiService, TemperatureResponseDto } from "../../common/services/api.service";
import { Button } from "../../ui/components/button/button";
import { Radio, RadioOption } from "../../ui/components/radio/radio";
import { getExportHtml } from "./export.base";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

export type PictureSize = "sm" | "md" | "lg";
export type PictureCroppingBehavior = "crop" | "fit";

@Component({
  selector: "app-collage-page",
  imports: [Radio, FormsModule, ReactiveFormsModule, Button],
  templateUrl: "./collage-page.html",
  styleUrl: "./collage-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollagePage implements OnInit {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  protected result!: TemperatureResponseDto;

  protected readonly pictureSizeOptions: RadioOption[] = [
    {
      label: "Small",
      value: "sm",
    },
    {
      label: "Medium",
      value: "md",
    },
    {
      label: "Large",
      value: "lg",
    },
  ];

  protected readonly pictureCroppingBehavior: RadioOption[] = [
    {
      label: "Fit",
      value: "fit",
    },
    {
      label: "Crop",
      value: "crop",
    },
  ];

  protected form = new FormGroup({
    picSize: new FormControl<PictureSize>("md", { nonNullable: true }),
    picCroppingBehavior: new FormControl<PictureCroppingBehavior>("fit", { nonNullable: true }),
  });

  ngOnInit(): void {
    const result = this.api.result;

    if (!result) {
      return void this.router.navigateByUrl("/");
    }

    this.result = result;
  }

  picUrl(filename: string): string | null {
    const file = this.api.files?.find(i => i.name === filename);

    if (!file)
      return null;

    return URL.createObjectURL(file);
  }

  back(): void {
    this.router.navigateByUrl("/");
  }

  get cropBehavior(): PictureCroppingBehavior {
    return this.form.controls.picCroppingBehavior.value;
  }

  async export(): Promise<void> {
    const container = document.getElementById("export-container");
    if (!container)
      throw new Error("Export container not found");

    const content = container.cloneNode(true) as HTMLElement;
    const imgs = content.querySelectorAll("img");

    for (const img of Array.from(imgs)) {
      const response = await fetch((img as HTMLImageElement).src);
      const blob = await response.blob();
      const reader = new FileReader();

      const base64: string = await new Promise((resolve) => {
        reader.onloadend = (): void => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      img.setAttribute("src", base64);
    }

    const h1 = content.querySelector("h1");
    if (h1)
      h1.parentNode?.removeChild(h1);

    const blob = new Blob(
      [
        getExportHtml(content.innerHTML),
      ],
      { type: "text/html" },
    );

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "export.html";
    a.click();
  }
}
