import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishIngredientRistoratoreComponent } from './dish-ingredient-ristoratore.component';
import { IngredientRistoratoreService } from '../../../../services/ristoratore/ingredient.ristoratore.service';
import { OneSelectionService } from '../../../../services/ristoratore/ingredient-selection.ristoratore.service';
import { MatCardModule } from '@angular/material/card';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DishIngredient, Ingredient } from '../../../../interfaces/ingredient';

describe('DishIngredientRistoratoreComponent', () => {
  let component: DishIngredientRistoratoreComponent;
  let fixture: ComponentFixture<DishIngredientRistoratoreComponent>;
  let mockIngredientService: jasmine.SpyObj<IngredientRistoratoreService>;
  let mockOneSelectionService: jasmine.SpyObj<OneSelectionService>;

  beforeEach(async () => {
    mockIngredientService = jasmine.createSpyObj(
      'IngredientRistoratoreService',
      ['get_one'],
    );
    mockOneSelectionService = jasmine.createSpyObj('OneSelectionService', [
      'subscribe',
      'unsubscribe',
      'select',
      'selected',
      'deselect',
    ]);

    await TestBed.configureTestingModule({
      imports: [MatCardModule, DishIngredientRistoratoreComponent],
      providers: [
        {
          provide: IngredientRistoratoreService,
          useValue: mockIngredientService,
        },
        { provide: OneSelectionService, useValue: mockOneSelectionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishIngredientRistoratoreComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ingredient details if ingredient is provided', async () => {
    const dishIngredient = { id_ingredient: 1, quantity: 2 } as DishIngredient;
    const ingredientDetail = { id: 1, name: 'Tomato' } as Ingredient;
    component.ingredient = dishIngredient;
    mockIngredientService.get_one.and.returnValue(
      Promise.resolve(ingredientDetail),
    );

    fixture.detectChanges(); // Trigger ngOnInit

    await fixture.whenStable(); // Wait for async operations to complete

    expect(mockIngredientService.get_one).toHaveBeenCalledWith(
      dishIngredient.id_ingredient,
    );
    expect(component.ingredient_for_name).toEqual(ingredientDetail);
  });

  it('should handle selection', () => {
    const dishIngredient = { id_ingredient: 1, quantity: 2 } as DishIngredient;
    component.ingredient = dishIngredient;

    component.select();

    expect(mockOneSelectionService.select).toHaveBeenCalledWith(
      dishIngredient.id_ingredient,
    );
  });

  it('should notify and set is_selected based on selection service', () => {
    const dishIngredient = { id_ingredient: 1, quantity: 2 } as DishIngredient;
    component.ingredient = dishIngredient;
    mockOneSelectionService.selected.and.returnValue(1);

    component.notify();

    expect(component.is_selected).toBeTrue();
  });

  it('should emit onChanges when on_changes is called', () => {
    spyOn(component.onChanges, 'emit');

    component.on_changes();

    expect(component.onChanges.emit).toHaveBeenCalled();
    expect(mockOneSelectionService.deselect).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
