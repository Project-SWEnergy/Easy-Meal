import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IngredientPageRistoratoreComponent } from './ingredient-page-ristoratore.component';
import { IngredientRistoratoreService } from '../../../services/ristoratore/ingredient.ristoratore.service';
import { Ingredient, UnitOfMeasurement } from '../../../interfaces/ingredient';
import { AuthService } from '../../../services/auth.service';

describe('IngredientPageRistoratoreComponent', () => {
  let component: IngredientPageRistoratoreComponent;
  let fixture: ComponentFixture<IngredientPageRistoratoreComponent>;
  let mockIngredientService: jasmine.SpyObj<IngredientRistoratoreService>;
  const expectedIngredients: Ingredient[] = [
    { id: 1, name: 'Salt', unit_of_measurement: UnitOfMeasurement.g },
  ] as Ingredient[];
  const authServiceMock = {
    get: jasmine
      .createSpy('get')
      .and.returnValue({ id: 1, role: 'restaurant' }), // Ensure this matches expected structure
  };

  beforeEach(waitForAsync(() => {
    mockIngredientService = jasmine.createSpyObj(
      'IngredientRistoratoreService',
      ['get_all', 'create'],
    );
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        IngredientPageRistoratoreComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: IngredientRistoratoreService,
          useValue: mockIngredientService,
        },
      ],
    }).compileComponents();
    mockIngredientService.get_all.and.returnValue(
      Promise.resolve(expectedIngredients),
    );

    fixture = TestBed.createComponent(IngredientPageRistoratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should load ingredients on initialization', async () => {
    await component.ngOnInit();

    expect(component.ingredients).toEqual(expectedIngredients);
    expect(mockIngredientService.get_all).toHaveBeenCalled();
  });

  it('should not submit form if it is invalid', () => {
    mockIngredientService.get_all.and.returnValue(
      Promise.resolve(expectedIngredients),
    );
    component.form.controls['name'].setValue('');
    component.form.controls['unit_of_measurement'].setValue('');

    component.new_ingredient();

    expect(mockIngredientService.create).not.toHaveBeenCalled();
  });

  it('should submit form and reload ingredients if valid', async () => {
    const validIngredient = {
      name: 'Pepper',
      unit_of_measurement: UnitOfMeasurement.g,
    };
    mockIngredientService.create.and.returnValue(
      Promise.resolve({ id: 2, ...validIngredient } as Ingredient),
    );
    mockIngredientService.get_all.and.returnValue(Promise.resolve([])); // Simulate reloading of ingredients

    component.form.controls['name'].setValue('Pepper');
    component.form.controls['unit_of_measurement'].setValue(
      UnitOfMeasurement.g,
    );
    await component.new_ingredient();

    expect(mockIngredientService.create).toHaveBeenCalledWith(validIngredient);
    expect(mockIngredientService.get_all).toHaveBeenCalled();
    expect(component.form.value).toEqual({
      name: null,
      unit_of_measurement: null,
    }); // Form should be reset
  });
});
