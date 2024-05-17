import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRistoratoreComponent } from './calendar-ristoratore.component';

describe('CalendarRistoratoreComponent', () => {
  let component: CalendarRistoratoreComponent;
  let fixture: ComponentFixture<CalendarRistoratoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarRistoratoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarRistoratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
