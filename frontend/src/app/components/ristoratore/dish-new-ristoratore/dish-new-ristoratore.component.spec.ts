import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DishNewRistoratoreComponent } from './dish-new-ristoratore.component';
import { DishRistoratoreService } from '../../../services/ristoratore/dish.ristoratore.service';
import { Router } from '@angular/router';
import { Dish } from '../../../interfaces/dish';

describe('DishNewRistoratoreComponent', () => {
  let component: DishNewRistoratoreComponent;
  let fixture: ComponentFixture<DishNewRistoratoreComponent>;
  let mockDishService: jasmine.SpyObj<DishRistoratoreService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockDishService = jasmine.createSpyObj('DishRistoratoreService', [
      'create',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        DishNewRistoratoreComponent,
      ],
      providers: [
        { provide: DishRistoratoreService, useValue: mockDishService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishNewRistoratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.form.controls['name'].setValue('');
    component.on_submit();
    expect(mockDishService.create).not.toHaveBeenCalled();
  });

  it('should submit form and navigate on success', () => {
    component.form.setValue({
      name: 'Test Dish',
      description: 'A delicious test',
      price: 20,
      image: 'test.png',
    });
    component.file = new File([''], 'test.png');
    mockDishService.create.and.returnValue(
      Promise.resolve({ id: 123 } as Dish),
    );
    component.on_submit();
    fixture.whenStable().then(() => {
      expect(mockDishService.create).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith([
        'ristoratore/dishes/123',
      ]);
    });
  });

  it('should handle create failure', () => {
    component.form.setValue({
      name: 'Test Dish',
      description: 'A delicious test',
      price: 20,
      image: 'test.png',
    });
    component.file = new File([''], 'test.png');
    mockDishService.create.and.returnValue(Promise.reject());
    component.on_submit();
    fixture
      .whenStable()
      .then(() => {
        expect().nothing();
      })
      .catch((err) => {
        expect(err).toBe('Error creating dish');
      });
  });

  it('should handle file input and load image preview', () => {
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const event = { target: { files: [file] } };
    const readerSpy = jasmine.createSpyObj('FileReader', [
      'readAsDataURL',
      'onload',
    ]);

    spyOn(window, 'FileReader').and.returnValue(readerSpy);
    readerSpy.readAsDataURL.and.callFake(() => {
      readerSpy.onload({
        target: {
          result:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        },
      });
      expect(component.uploaded_pic).toBe(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      );
    });

    component.on_file_selected(event);
    expect(component.file).toEqual(file);
  });
});
