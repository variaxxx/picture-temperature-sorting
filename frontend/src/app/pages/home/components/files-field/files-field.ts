import { Button } from "../../../../ui/components/button/button";
import { Icon } from "../../../../ui/components/icon/icon";
import { NotificationService } from "../../../../ui/components/notification/notification.service";
import { FileItem } from "../file-item/file-item";
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, inject, signal, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-files-field",
  imports: [FileItem, Icon, Button],
  templateUrl: "./files-field.html",
  styleUrl: "./files-field.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilesField),
      multi: true,
    },
  ],
})
export class FilesField implements ControlValueAccessor {
  private readonly notificationService = inject(NotificationService);

  private imageTypes = ["image/png", "image/jpg", "image/jpeg"];

  protected isDraggedOver = signal<boolean>(false);
  protected files = signal<File[]>([]);

  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;

  triggerFileSelect(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target || !target.files?.length)
      return;

    this.processFiles(target.files);
  };

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // event.dataTransfer!.dropEffect = "copy";
    this.isDraggedOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDraggedOver.set(false);
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDraggedOver.set(false);

    if (!event.dataTransfer?.files.length)
      return;

    this.processFiles(event.dataTransfer.files);
  }

  remove(name: string): void {
    this.files.set(this.files().filter(i => i.name !== name));
  }

  private processFiles(files: File[] | FileList): void {
    const updates: File[] = [];

    for (const file of files) {
      if (!this.imageTypes.includes(file.type))
        return this.notificationService.show("error", "Invalid photo type");
      if (updates.find(i => i.name === file.name) || this.files().find(i => i.name === file.name))
        return this.notificationService.show("warning", "Photo with this name already added");
      if (updates.length + this.files.length > 50)
        return this.notificationService.show("warning", "Photos limit exceeded");

      updates.push(file);
    }

    this.files.set([...this.files(), ...updates]);
    this.onChange(this.files());
    this.onTouched();
  }

  writeValue(obj: File[]): void {
    this.files.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (value: any): void => {};
  onTouched = (): void => {};
}
