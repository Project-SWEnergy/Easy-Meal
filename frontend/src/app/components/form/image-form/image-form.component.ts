import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css',
})
export class ImageFormComponent {
  @Input() label: string;
  img: File;
  uploaded_img: string;

  @Output() onChange = new EventEmitter<File>();

  /** Whenever a picture is uploaded:
   * 1. the picture is previewed, if possible
   * 2. the picture is sent to the parent
   */
  on_img_uploaded(event: any) {
    this.img = event.target.files[0];

    if (this.img) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploaded_img = e.target?.result as string;
      };
      reader.readAsDataURL(this.img);
    }

    this.onChange.emit(this.img);
  }
}
