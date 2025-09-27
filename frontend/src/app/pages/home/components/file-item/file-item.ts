import { FileSizePipe } from "../../../../common/pipes/file-size.pipe";
import { ImageCompressorService } from "../../../../common/services/image-compressor.service";
import { Icon } from "../../../../ui/components/icon/icon";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, output } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { from, map, of, shareReplay, switchMap } from "rxjs";

@Component({
  selector: "app-file-item",
  imports: [
    Icon,
    FileSizePipe,
    AsyncPipe,
  ],
  templateUrl: "./file-item.html",
  styleUrl: "./file-item.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItem {
  private readonly imageCompressor = inject(ImageCompressorService);
  file = input.required<File>();

  protected preview$ = toObservable(this.file).pipe(
    switchMap(file =>
      file
        ? from(this.imageCompressor.compress(file, 48 * 3, 96 * 3)).pipe(
            map((val) => {
              return URL.createObjectURL(val);
            }),
          )
        : of(null),
    ),
    shareReplay(1),
  );

  removeOutput = output<string>({ alias: "remove" });

  remove(): void {
    this.removeOutput.emit(this.file().name);
  }
}
