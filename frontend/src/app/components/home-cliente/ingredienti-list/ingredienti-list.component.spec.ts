import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { IngredientiListComponent } from './ingredienti-list.component';
import { IngredientiService } from '../../../services/home-generico/ingredienti.service';
import { CarrelloService } from '../../../services/home-cliente/carrello.service';
import { Ingredient } from '../../../interfaces/ingredienti';

describe('IngredientiListComponent', () => {
  let component: IngredientiListComponent;
  let fixture: ComponentFixture<IngredientiListComponent>;
  let ingredientiService: jasmine.SpyObj<IngredientiService>;
  let cartService: jasmine.SpyObj<CarrelloService>;

  beforeEach(waitForAsync(() => {
    ingredientiService = jasmine.createSpyObj('IngredientiService', [
      'getIngredientsByDishId',
      'getIngredientsById',
    ]);
    cartService = jasmine.createSpyObj('CarrelloService', [
      'removeIngredientFromCart',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [
        { provide: IngredientiService, useValue: ingredientiService },
        { provide: CarrelloService, useValue: cartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ingredients when dishId is provided', async () => {
    const dishId = 1;
    const mockIngredients: Ingredient[] = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Ingredient 1',
        unity_of_measurement: 'g',
      },
    ];
    ingredientiService.getIngredientsByDishId.and.returnValue(
      Promise.resolve([1]),
    );
    ingredientiService.getIngredientsById.and.returnValue(
      Promise.resolve(mockIngredients),
    );

    await component.loadIngredients(dishId);

    expect(component.ingredients).toEqual(mockIngredients);
  });

  it('should fetch ingredients from IngredientiService', async () => {
    const dishId = 1;
    ingredientiService.getIngredientsByDishId.and.returnValue(
      Promise.resolve([1]),
    );
    ingredientiService.getIngredientsById.and.returnValue(
      Promise.resolve([
        {
          id: 1,
          id_restaurant: 1,
          name: 'Ingredient 1',
          unity_of_measurement: 'g',
        },
      ]),
    );

    await component.loadIngredients(dishId);

    expect(ingredientiService.getIngredientsByDishId).toHaveBeenCalledWith(
      dishId,
    );
    expect(ingredientiService.getIngredientsById).toHaveBeenCalled();
  });

  it('should remove ingredient from cart using CarrelloService', () => {
    const dishId = 1;
    const ingredientId = 1;
    const ingredientName = 'Ingredient 1';
    component.dishId = dishId; // Assicurati che dishId sia definito
    component.removeIngredientFromCart(ingredientId, ingredientName);
    expect(cartService.removeIngredientFromCart).toHaveBeenCalledWith(
      dishId,
      ingredientId,
      ingredientName,
    );
    expect(cartService.removeIngredientFromCart).toHaveBeenCalledTimes(1); // Aggiungi questa riga
  });
});
