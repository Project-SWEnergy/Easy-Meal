import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientiListComponent } from './ingredienti-list.component';
import { IngredientiService } from '../../../services/home-generico/ingredienti.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('IngredientiListComponent', () => {
  let component: IngredientiListComponent;
  let fixture: ComponentFixture<IngredientiListComponent>;
  let ingredientiService: IngredientiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [IngredientiService],
    }).compileComponents();

    ingredientiService = TestBed.inject(IngredientiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientiListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadIngredients on ngOnInit', async () => {
    const dishId = 1;
    spyOn(ingredientiService, 'getIngredientsByDishId').and.returnValue(
      Promise.resolve([]),
    );
    component.dishId = dishId;
    await component.ngOnInit();
    expect(ingredientiService.getIngredientsByDishId).toHaveBeenCalledWith(
      dishId,
    );
  });

  it('should set ingredients property with result from service', async () => {
    const ingredients = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Ingredient 1',
        unity_of_measurement: 'gram',
      },
      {
        id: 2,
        id_restaurant: 1,
        name: 'Ingredient 2',
        unity_of_measurement: 'unit',
      },
    ];
    const ingredientIds = ingredients.map((ingredient) => ingredient.id);
    spyOn(ingredientiService, 'getIngredientsByDishId').and.returnValue(
      Promise.resolve(ingredientIds),
    );
    spyOn(ingredientiService, 'getIngredientsById').and.returnValue(
      Promise.resolve(ingredients),
    );
    component.dishId = 1;
    await component.loadIngredients(component.dishId);
    expect(component.ingredients).toEqual(ingredients);
  });

  it('should handle error when retrieving ingredients by dish id', async () => {
    const errorMessage = 'Error retrieving ingredients by dish id';
    spyOn(ingredientiService, 'getIngredientsByDishId').and.returnValue(
      Promise.reject(errorMessage),
    );
    spyOn(console, 'error');
    component.dishId = 1;
    await component.loadIngredients(component.dishId);
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il caricamento degli ingredienti:',
      errorMessage,
    );
  });

  it('should handle error when retrieving ingredients by id', async () => {
    const errorMessage = 'Error retrieving ingredients by id';
    spyOn(ingredientiService, 'getIngredientsByDishId').and.returnValue(
      Promise.resolve([]),
    );
    spyOn(ingredientiService, 'getIngredientsById').and.returnValue(
      Promise.reject(errorMessage),
    );
    spyOn(console, 'error');
    component.dishId = 1;
    await component.loadIngredients(component.dishId);
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il caricamento degli ingredienti:',
      errorMessage,
    );
  });
});
