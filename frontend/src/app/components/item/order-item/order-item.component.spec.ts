import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { OrderItemComponent } from './order-item.component';
import { OrderedDishesRistoratoreService } from '../../../services/ristoratore/ordered-dishes.ristoratore.service';
import { OrderedDishes } from '../../../interfaces/ordered-dishes';

describe('OrderItemComponent', () => {
  let component: OrderItemComponent;
  let fixture: ComponentFixture<OrderItemComponent>;
  let mockOrderedDishesService: jasmine.SpyObj<OrderedDishesRistoratoreService>;

  beforeEach(async () => {
    mockOrderedDishesService = jasmine.createSpyObj(
      'OrderedDishesRistoratoreService',
      ['get_orders_price'],
    );

    await TestBed.configureTestingModule({
      imports: [MatCardModule, OrderItemComponent],
      providers: [
        {
          provide: OrderedDishesRistoratoreService,
          useValue: mockOrderedDishesService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize price correctly from service', async () => {
    const testOrders: OrderedDishes[] = [
      {
        id: 1,
        id_ordered_dish: 1,
        id_user: 1,
        name_user: 'hello',
        surname_user: 'hello',
        id_reservation: 1,
        id_dish: 1,
        name_dish: 'carbonara',
        image_dish: 'carbonara.jpg',
        price_dish: 7,
        paid: false,
        removed_ingredients: [
          {
            id_ingredient: 1,
            name_ingredient: 'guanciale',
          },
        ],
      },
      {
        id: 2,
        id_ordered_dish: 2,
        id_user: 1,
        name_user: 'hello',
        surname_user: 'hello',
        id_reservation: 1,
        id_dish: 1,
        name_dish: 'carbonara',
        image_dish: 'carbonara.jpg',
        price_dish: 7,
        paid: false,
        removed_ingredients: [],
      },
    ];
    component.order = testOrders;
    mockOrderedDishesService.get_orders_price.and.returnValue('50');

    fixture.detectChanges();
    fixture.whenStable();

    expect(component.price).toEqual('50');
    expect(mockOrderedDishesService.get_orders_price).toHaveBeenCalledWith(
      testOrders,
    );
  });
});
