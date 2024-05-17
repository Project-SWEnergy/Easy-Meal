import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import { Dish } from '../../../interfaces/dish';
import { MenuService } from '../../../services/home-generico/menu.service';
import { CarrelloService } from '../../../services/home-cliente/carrello.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingredienti-list',
  template: '',
})
class MockIngredientiListComponent {
  @Input() dishId: number | undefined;
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let menuService: MenuService;
  let carrelloService: CarrelloService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockIngredientiListComponent],
      imports: [CommonModule],
      providers: [
        { provide: MenuService, useClass: MockMenuService },
        { provide: CarrelloService, useClass: MockCarrelloService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    carrelloService = TestBed.inject(CarrelloService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load menu when restaurantId is provided', fakeAsync(() => {
    const mockMenu: Dish[] = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Pizza',
        description: 'Delicious pizza',
        price: 10,
        image: 'pizza.jpg',
      },
    ];
    spyOn(menuService, 'getMenuByRestaurantId').and.returnValue(
      Promise.resolve(mockMenu),
    );

    component.ristoranteId = 1;
    component.ngOnInit();
    tick();

    expect(menuService.getMenuByRestaurantId).toHaveBeenCalledWith(1);
    expect(component.menu).toEqual(mockMenu);
  }));

  it('should not load menu when restaurantId is not provided', fakeAsync(() => {
    spyOn(menuService, 'getMenuByRestaurantId').and.stub();

    component.ngOnInit();
    tick();

    expect(menuService.getMenuByRestaurantId).not.toHaveBeenCalled();
    expect(component.menu).toEqual([]);
  }));

  it('should add dish to cart', () => {
    spyOn(carrelloService, 'addToCart').and.stub();

    component.addToCart(1, 'Pizza', 'pizza.jpg', 10);

    expect(carrelloService.addToCart).toHaveBeenCalledWith(
      1,
      'Pizza',
      'pizza.jpg',
      10,
    );
  });

  it('should remove dish from cart', () => {
    spyOn(carrelloService, 'removeFromCart').and.stub();

    component.removeFromCart(1);

    expect(carrelloService.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should integrate IngredientiListComponent correctly', () => {
    const mockDish: Dish = {
      id: 1,
      id_restaurant: 1,
      name: 'Pizza',
      description: 'Delicious pizza',
      price: 10,
      image: 'pizza.jpg',
    };
    component.menu = [mockDish];
    fixture.detectChanges();

    const ingredientiListElement =
      fixture.debugElement.nativeElement.querySelector('app-ingredienti-list');

    expect(ingredientiListElement).toBeTruthy();
    //expect(ingredientiListElement.componentInstance.dishId).toBe(1);
  });
});

class MockMenuService {
  getMenuByRestaurantId(restaurantId: number): any {
    return of([]);
  }
}

class MockCarrelloService {
  addToCart(
    id_dish: number,
    dishName: string,
    dishImage: string,
    dishPrice: number,
  ): void {}
  removeFromCart(id_dish: number): void {}
}
