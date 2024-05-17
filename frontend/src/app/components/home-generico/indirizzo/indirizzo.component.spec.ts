import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { IndirizzoComponent } from './indirizzo.component';
import { IndirizzoService } from '../../../services/home-generico/indirizzo.service';
import { of } from 'rxjs';
import { Indirizzo } from '../../../interfaces/address';

describe('IndirizzoComponent', () => {
  let component: IndirizzoComponent;
  let fixture: ComponentFixture<IndirizzoComponent>;
  let indirizzoService: IndirizzoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [IndirizzoService],
    }).compileComponents();

    fixture = TestBed.createComponent(IndirizzoComponent);
    component = fixture.componentInstance;
    indirizzoService = TestBed.inject(IndirizzoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch indirizzo for ristorante', async () => {
    const indirizzo: Indirizzo = {
      id: 1,
      city: 'Roma',
      street: 'Via Roma',
      street_number: '1',
      state: 'Italy',
      zip_code: '00100',
    };

    spyOn(indirizzoService, 'getAddressByRestaurantId').and.returnValue(
      Promise.resolve(indirizzo),
    );
    component.ristoranteId = 1;
    await component.getIndirizzoForRistorante(1);
    expect(component.indirizzo).toEqual(indirizzo);
  });

  it('should integrate with IndirizzoService', async () => {
    const indirizzo = {
      id: 1,
      city: 'Roma',
      street: 'Via Roma',
      street_number: '1',
      state: 'Italy',
      zip_code: '00100',
    };

    spyOn(indirizzoService, 'getAddressByRestaurantId').and.returnValue(
      Promise.resolve(indirizzo),
    );
    component.ristoranteId = 1;
    await component.getIndirizzoForRistorante(1);
    expect(component.indirizzo).toEqual(indirizzo);
  });
});
