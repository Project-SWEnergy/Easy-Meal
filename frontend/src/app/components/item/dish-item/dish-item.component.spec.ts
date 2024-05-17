import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { DishItemComponent } from './dish-item.component';

describe('DishItemComponent', () => {
  let component: DishItemComponent;
  let fixture: ComponentFixture<DishItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, DishItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the free dish correctly', () => {
    const testDish = {
      id: 1,
      id_restaurant: 1,
      name: 'Free Salad',
      description: 'A complimentary salad',
      price: 0,
      image: 'path/to/freesalad.jpg',
    };

    component.dish = testDish;
    fixture.detectChanges(); // Update view with input

    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.new-dish-card mat-card-title').textContent,
    ).toContain(testDish.name);
    expect(
      compiled.querySelector('.new-dish-card mat-card-content').textContent,
    ).toContain(testDish.description);
    expect(compiled.querySelector('.new-dish-card img').src).toContain(
      testDish.image,
    );
    expect(
      compiled.querySelector('.new-dish-card mat-card-subtitle'),
    ).toBeNull();
  });

  it('should display the paid dish correctly', () => {
    const testDish = {
      id: 2,
      id_restaurant: 1,
      name: 'Pizza Margherita',
      description: 'Classic Italian pizza with tomatoes and mozzarella cheese',
      price: 10.99,
      image: 'path/to/pizza.jpg',
    };

    component.dish = testDish;
    fixture.detectChanges(); // Update view with input

    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.bg-form mat-card-title').textContent,
    ).toContain(testDish.name);
    expect(
      compiled.querySelector('.bg-form mat-card-subtitle').textContent,
    ).toContain(`${testDish.price}€`);
    expect(
      compiled.querySelector('.bg-form mat-card-content').textContent,
    ).toContain(testDish.description);
    expect(compiled.querySelector('.bg-form img').src).toContain(
      testDish.image,
    );
  });
});
