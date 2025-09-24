import { FileSizePipe } from "../../../../common/pipes/file-size.pipe";
import { Icon } from "../../../../ui/components/icon/icon";
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";

@Component({
  selector: "app-file-item",
  imports: [
    Icon,
    FileSizePipe,
  ],
  templateUrl: "./file-item.html",
  styleUrl: "./file-item.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItem {
  file = input.required<File>();

  removeOutput = output<string>({ alias: "remove" });

  preview() {
    return URL.createObjectURL(this.file());
  }

  remove(): void {
    this.removeOutput.emit(this.file().name);
  }
}
