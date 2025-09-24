import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileSize",
})
export class FileSizePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const kb = value / 1024;
    const mb = kb / 1024;
    if (mb >= 1) {
      return `${mb.toFixed(1)} MB`;
    } else if (kb >= 1) {
      return `${kb.toFixed(1)} kB`;
    } else {
      return `${value.toFixed(1)} B`;
    }
  }
}
