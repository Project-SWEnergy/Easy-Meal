import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishIngredientFormComponent } from './dish-ingredient-form.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DishIngredientRistoratoreService } from '../../../services/ristoratore/dish-ingredient.ristoratore.service';
import { IngredientRistoratoreService } from '../../../services/ristoratore/ingredient.ristoratore.service';
import { ObservableService } from '../../../services/lib/observable.service';
import {
  DishIngredient,
  Ingredient,
  UnitOfMeasurement,
} from '../../../interfaces/ingredient';
import { Dish } from '../../../interfaces/dish';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('DishIngredientFormComponent', () => {
  let component: DishIngredientFormComponent;
  let fixture: ComponentFixture<DishIngredientFormComponent>;
  let dishIngredientServiceMock: any;
  let ingredientServiceMock: any;
  let observableServiceMock: any;
  const mockIngredients: Ingredient[] = [
    {
      id: 1,
      name: 'Tomato',
      id_restaurant: 1,
      unit_of_measurement: UnitOfMeasurement.g,
    },
    {
      id: 2,
      name: 'Basil',
      id_restaurant: 1,
      unit_of_measurement: UnitOfMeasurement.g,
    },
  ];
  const mockDish: Dish = {
    id: 1,
    name: 'Pizza',
    id_restaurant: 1,
    price: 10,
    description: 'Delicious Italian pizza',
    image: 'a pic',
  };
  const mockDishIngredient: DishIngredient = {
    id_dish: 1,
    id_ingredient: 1,
    quantity: 2,
  };

  beforeEach(async () => {
    dishIngredientServiceMock = jasmine.createSpyObj(
      'DishIngredientRistoratoreService',
      ['get', 'create', 'update', 'delete'],
    );
    ingredientServiceMock = jasmine.createSpyObj(
      'IngredientRistoratoreService',
      ['get_one'],
    );
    observableServiceMock = jasmine.createSpyObj('ObservableService', [
      'notify',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        DishIngredientFormComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: DishIngredientRistoratoreService,
          useValue: dishIngredientServiceMock,
        },
        {
          provide: IngredientRistoratoreService,
          useValue: ingredientServiceMock,
        },
        { provide: ObservableService, useValue: observableServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishIngredientFormComponent);
    component = fixture.componentInstance;
    component.dish = mockDish;
    component.ingredient_list_observable = observableServiceMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize form with existing ingredient', async () => {
      component.ingredient = mockDishIngredient;
      ingredientServiceMock.get_one.and.returnValue(
        Promise.resolve(mockIngredients[0]),
      );
      await component.ngOnInit();
      expect(component.form.value).toEqual({
        quantity: mockDishIngredient.quantity,
      });
    });

    it('should initialize form for a new ingredient', async () => {
      component.ingredient = null;
      await component.ngOnInit();
      expect(component.form.value).toEqual({ name: '', quantity: null });
    });
  });

  describe('CRUD Operations', () => {
    beforeEach(() => {
      component.ingredient = mockDishIngredient;
      component.form = new FormGroup({
        name: new FormControl(mockIngredients[0]),
        quantity: new FormControl(2),
      });
    });

    it('should handle creation', async () => {
      dishIngredientServiceMock.create.and.returnValue(Promise.resolve(true));
      component.ingredient = null; // Simulate new ingredient creation
      await component.on_create();
      // the form is alright
      expect(dishIngredientServiceMock.create).toHaveBeenCalled();
      expect(observableServiceMock.notify).toHaveBeenCalled();
    });

    it('should handle failure on creation', async () => {
      component.ingredient = null; // Simulate new ingredient creation
      component.form.setErrors({ invalid: true }) // Simulate invalid form
      expect(component.form.valid).toBeFalse();
      await component.on_create();
      // the form is not valid
      expect(dishIngredientServiceMock.create).not.toHaveBeenCalled();
      expect(observableServiceMock.notify).not.toHaveBeenCalled();
    });

    it('should handle update', async () => {
      const onChangeSpy = spyOn(component.onChanges, 'emit');
      dishIngredientServiceMock.update.and.returnValue(Promise.resolve(true));
      await component.on_update();
      expect(dishIngredientServiceMock.update).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('should handle failure on update', async () => {
      const onChangeSpy = spyOn(component.onChanges, 'emit');
      component.ingredient = null;
      dishIngredientServiceMock.update.and.returnValue(Promise.resolve(true));
      await component.on_update();
      expect(dishIngredientServiceMock.update).not.toHaveBeenCalled();
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should handle deletion', async () => {
      dishIngredientServiceMock.delete.and.returnValue(Promise.resolve(true));
      await component.on_delete();
      expect(dishIngredientServiceMock.delete).toHaveBeenCalledWith(
        mockDishIngredient,
      );
      expect(observableServiceMock.notify).toHaveBeenCalled();
    });

    it('should handle failure on deletion', async () => {
      component.ingredient = null; // Simulate new ingredient creation
      await component.on_delete();

      expect(observableServiceMock.notify).not.toHaveBeenCalled();
    });
  });

  it('should dispaly the name of the ingredient', () => {
    const ingredient = mockIngredients[0];
    expect(component.displayFn(ingredient)).toBe(ingredient.name);
  })

  it('should dispaly an empty string', () => {
    const ingredient = null;
    expect(component.displayFn(ingredient as any)).toBe('');
  })

  it('should filter the ingredients', () => {
    component.ingredients = mockIngredients;
    const filtered = component['_filter']('Tom');
    expect(filtered).toEqual([mockIngredients[0]]);
  })
});