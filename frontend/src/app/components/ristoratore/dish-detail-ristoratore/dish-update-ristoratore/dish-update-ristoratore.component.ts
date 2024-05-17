import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Dish } from '../../../../interfaces/dish';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DishRistoratoreService } from '../../../../services/ristoratore/dish.ristoratore.service';
import { DishItemComponent } from '../../../item/dish-item/dish-item.component';

@Component({
  selector: 'app-dish-update-ristoratore',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    DishItemComponent,
  ],
  templateUrl: './dish-update-ristoratore.component.html',
  styleUrl: './dish-update-ristoratore.component.css',
})
export class DishUpdateRistoratoreComponent implements OnInit {
  selected = false;
  @Input() dish: Dish;
  form: FormGroup;
  file: File;
  uploaded_pic: string;

  @Output() onChanges = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  dish_service = inject(DishRistoratoreService);

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.dish.name ?? '', [Validators.required]),
      description: new FormControl(
        this.dish.description ?? '',
        Validators.maxLength(255),
      ),
      price: new FormControl(this.dish.price ?? 0, [
        Validators.min(0),
        Validators.required,
      ]),
      image: new FormControl(this.dish.image ?? ''),
    });
  }

  // this fn is for displaying the preview of the picture uploaded by the user
  on_file_selected(event: any) {
    this.file = event.target.files[0];
    this.form.get('image')?.updateValueAndValidity();

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploaded_pic = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  // update the dish with the form data
  on_submit() {
    if (!this.form.valid) {
      return;
    }

    const form = {
      ...this.form.value,
      id: this.dish.id,
      file: this.file,
    };

    this.dish_service
      .update(form)
      .then((res) => {
        if (res) {
          this.selected = false;
          this.onChanges.emit();
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  // delete the dish
  async on_delete() {
    let res: boolean = true;
    try {
      res = await this.dish_service.delete(this.dish.id);
    } catch (err) {
      console.error(err);
    }

    if (res) {
      this.onDelete.emit();
    }
  }
}
