import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { DishOrderedItemComponent } from './dish-ordered-item.component';

describe('DishOrderedItemComponent', () => {
  let component: DishOrderedItemComponent;
  let fixture: ComponentFixture<DishOrderedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, DishOrderedItemComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DishOrderedItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
