import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DishUpdateRistoratoreComponent } from './dish-update-ristoratore.component';
import { DishRistoratoreService } from '../../../../services/ristoratore/dish.ristoratore.service';
import { Dish } from '../../../../interfaces/dish';

describe('DishUpdateRistoratoreComponent', () => {
  let component: DishUpdateRistoratoreComponent;
  let fixture: ComponentFixture<DishUpdateRistoratoreComponent>;
  let mockDishService: jasmine.SpyObj<DishRistoratoreService>;
  const mockDish = {
    id: 1,
    name: 'Pizza',
    description: 'Delicious pizza',
    price: 10,
    image: 'image.jpg',
  } as Dish;

  beforeEach(async () => {
    mockDishService = jasmine.createSpyObj('DishRistoratoreService', [
      'update',
      'delete',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        DishUpdateRistoratoreComponent,
      ],
      providers: [
        { provide: DishRistoratoreService, useValue: mockDishService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishUpdateRistoratoreComponent);
    component = fixture.componentInstance;
    component.dish = mockDish;
    fixture.detectChanges();
  });

  it('should create and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.form.value).toEqual({
      name: mockDish.name,
      description: mockDish.description,
      price: mockDish.price,
      image: mockDish.image,
    });
  });

  it('should update dish on form submit', () => {
    component.form.controls['name'].setValue('Updated Pizza');
    mockDishService.update.and.returnValue(Promise.resolve(true));
    component.on_submit();

    expect(mockDishService.update).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
  });

  //  it('should handle file selection and load file preview', () => {
  //    const blob = new Blob([''], { type: 'image/jpeg' }) as any;
  //    blob['lastModified'] = '';
  //    blob['name'] = 'filename';
  //    const fakeEvent = { target: { files: [blob] as File[] } };
  //    spyOn(window, 'FileReader').and.returnValue({
  //      readAsDataURL: function() { this.onload({ target: { result: 'data:image/jpeg;base64,' } }); },
  //      onload: null
  //    });
  //
  //    component.on_file_selected(fakeEvent);
  //    expect(component.file).toEqual(blob);
  //    expect(component.uploaded_pic).toContain('data:image/jpeg;base64,');
  //  });

  it('should emit event on dish deletion', async () => {
    spyOn(component.onDelete, 'emit');
    mockDishService.delete.and.returnValue(Promise.resolve(true));
    await component.on_delete();

    expect(mockDishService.delete).toHaveBeenCalledWith(mockDish.id);
    expect(component.onDelete.emit).toHaveBeenCalled();
  });
});
