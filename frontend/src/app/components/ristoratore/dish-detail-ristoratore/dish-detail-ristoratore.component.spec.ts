import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DishDetailRistoratoreComponent } from './dish-detail-ristoratore.component';
import { DishRistoratoreService } from '../../../services/ristoratore/dish.ristoratore.service';
import { DishIngredientRistoratoreService } from '../../../services/ristoratore/dish-ingredient.ristoratore.service';
import { MessageService } from '../../../services/lib/message.service';
import { Dish } from '../../../interfaces/dish';

describe('DishDetailRistoratoreComponent', () => {
  let component: DishDetailRistoratoreComponent;
  let fixture: ComponentFixture<DishDetailRistoratoreComponent>;
  let mockDishService: jasmine.SpyObj<DishRistoratoreService>;
  let mockDishIngredientService: jasmine.SpyObj<DishIngredientRistoratoreService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockRouter: Router;

  beforeEach(async () => {
    mockDishService = jasmine.createSpyObj('DishRistoratoreService', ['get']);
    mockDishIngredientService = jasmine.createSpyObj(
      'DishIngredientRistoratoreService',
      ['ingredients_in_dish'],
    );
    mockMessageService = jasmine.createSpyObj('MessageService', ['log']);

    await TestBed.configureTestingModule({
      imports: [DishDetailRistoratoreComponent],
      providers: [
        { provide: DishRistoratoreService, useValue: mockDishService },
        {
          provide: DishIngredientRistoratoreService,
          useValue: mockDishIngredientService,
        },
        { provide: MessageService, useValue: mockMessageService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123', // Simulating retrieving 'id' from the route
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishDetailRistoratoreComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dish data and ingredients if id is present', async () => {
    const dish = {
      id: 123,
      name: 'Pizza',
      description: 'Delicious pizza',
    } as Dish;
    const ingredients = [{ id_dish: 1, id_ingredient: 1, quantity: 100 }];
    mockDishService.get.and.returnValue(Promise.resolve(dish));
    mockDishIngredientService.ingredients_in_dish.and.returnValue(
      Promise.resolve(ingredients),
    );

    await component.load_data(123);

    expect(component.dish).toEqual(dish);
    expect(component.ingredients).toEqual(ingredients);
    expect(mockDishService.get).toHaveBeenCalledWith(123);
    expect(mockDishIngredientService.ingredients_in_dish).toHaveBeenCalledWith(
      123,
    );
  });

  it('should navigate back to the dishes list', () => {
    component.navigate_back();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['ristoratore/dishes']);
  });
});
