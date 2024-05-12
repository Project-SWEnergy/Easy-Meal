import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCreateFormComponent } from './address-create-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('AddressCreateFormComponent', () => {
  let component: AddressCreateFormComponent;
  let fixture: ComponentFixture<AddressCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCreateFormComponent, BrowserAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
