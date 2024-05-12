import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DishPageRistoratoreComponent } from './dish-page-ristoratore.component';
import { DishesRistoratoreService } from '../../../services/ristoratore/dishes.ristoratore.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Dish } from '../../../interfaces/dish';

describe('DishPageRistoratoreComponent', () => {
  let component: DishPageRistoratoreComponent;
  let fixture: ComponentFixture<DishPageRistoratoreComponent>;
  let mockDishesService: jasmine.SpyObj<DishesRistoratoreService>;
  let router: Router;

  beforeEach(async () => {
    mockDishesService = jasmine.createSpyObj('DishesRistoratoreService', [
      'get',
    ]);
    await TestBed.configureTestingModule({
      imports: [MatCardModule, DishPageRistoratoreComponent],
      providers: [
        { provide: DishesRistoratoreService, useValue: mockDishesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishPageRistoratoreComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create and fetch dishes', async () => {
    const dishes: Dish[] = [
      { id: 1, name: 'Pizza', description: 'Delicious pizza' },
    ] as Dish[];
    mockDishesService.get.and.returnValue(Promise.resolve(dishes));

    await component.ngOnInit();

    expect(component.dishes).toEqual(dishes);
    expect(mockDishesService.get).toHaveBeenCalled();
  });

  it('should handle navigation to dish detail', () => {
    const dish = { id: 1, name: 'Pizza' } as Dish;
    component.onCardClicked(dish);
    expect(router.navigate).toHaveBeenCalledWith([
      'ristoratore/dishes/' + dish.id,
    ]);
  });

  it('should navigate to new dish creation page', () => {
    component.onNewDishClicked();
    expect(router.navigate).toHaveBeenCalledWith(['ristoratore/dishes/new']);
  });
});
