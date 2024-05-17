import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { MenuService } from '../../../services/home-generico/menu.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Dish } from '../../../interfaces/dish';
import { IngredientiListComponent } from '../ingredienti-list-generico/ingredienti-list.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [MenuService],
    }).compileComponents();

    menuService = TestBed.inject(MenuService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadMenu on ngOnInit', async () => {
    const restaurantId = 1;
    spyOn(menuService, 'getMenuByRestaurantId').and.returnValue(
      Promise.resolve([]),
    );
    component.ristoranteId = restaurantId;
    await component.ngOnInit();
    expect(menuService.getMenuByRestaurantId).toHaveBeenCalledWith(
      restaurantId,
    );
  });

  it('should set menu property with result from service', async () => {
    const menu = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Dish 1',
        description: 'Description 1',
        price: 10,
        image: 'image1.jpg',
      },
      {
        id: 2,
        id_restaurant: 1,
        name: 'Dish 2',
        description: 'Description 2',
        price: 15,
        image: 'image2.jpg',
      },
    ];
    spyOn(menuService, 'getMenuByRestaurantId').and.returnValue(
      Promise.resolve(menu),
    );
    component.ristoranteId = 1;
    await component.loadMenu(component.ristoranteId);
    expect(component.menu).toEqual(menu);
  });

  it('should handle error when retrieving menu', async () => {
    const errorMessage = 'Error retrieving menu';
    spyOn(menuService, 'getMenuByRestaurantId').and.returnValue(
      Promise.reject(errorMessage),
    );
    spyOn(console, 'error');
    component.ristoranteId = 1;
    await component.loadMenu(component.ristoranteId);
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il caricamento del menu:',
      errorMessage,
    );
  });

  it('should load dishes on initialization and render them with ingredients in the view', async () => {
    const mockMenu: Dish[] = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Dish 1',
        description: 'Description 1',
        price: 10,
        image: 'image1.jpg',
      },
      {
        id: 2,
        id_restaurant: 1,
        name: 'Dish 2',
        description: 'Description 2',
        price: 15,
        image: 'image2.jpg',
      },
    ];
    spyOn(menuService, 'getMenuByRestaurantId').and.returnValue(
      Promise.resolve(mockMenu),
    );
    await component.loadMenu(1); // Chiamiamo il metodo loadMenu esplicitamente
    fixture.detectChanges();

    // Verifica che i piatti vengano visualizzati correttamente nella vista
    const menuElements = fixture.debugElement.queryAll(By.css('.menu-item'));
    expect(menuElements.length).toBe(mockMenu.length);
    menuElements.forEach((element, index) => {
      expect(element.nativeElement.textContent).toContain(mockMenu[index].name);
      expect(element.nativeElement.textContent).toContain(
        mockMenu[index].description,
      );
      expect(element.nativeElement.textContent).toContain(
        `${mockMenu[index].price}€`,
      );

      // Verifica che la componente IngredientiListComponent sia presente
      const ingredientiComponent = element.query(
        By.directive(IngredientiListComponent),
      ).nativeElement;
      expect(ingredientiComponent).toBeTruthy();

      // Imposta manualmente l'attributo dishId sulla componente IngredientiListComponent
      ingredientiComponent.setAttribute(
        'dishId',
        mockMenu[index].id.toString(),
      );
    });
  });
});
