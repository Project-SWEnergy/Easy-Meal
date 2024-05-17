import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { OrderedIngredientItemComponent } from './ordered-ingredient-item.component';
import { IngredientOrdered } from '../../../interfaces/ingredient';

describe('OrderedIngredientItemComponent', () => {
  let component: OrderedIngredientItemComponent;
  let fixture: ComponentFixture<OrderedIngredientItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, OrderedIngredientItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderedIngredientItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
