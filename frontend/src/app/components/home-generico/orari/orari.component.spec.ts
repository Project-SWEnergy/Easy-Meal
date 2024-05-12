import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrariComponent } from './orari.component';
import { CommonModule } from '@angular/common';
import { OrarioService } from '../../../services/home-generico/orario.service';

describe('OrariComponent', () => {
  let component: OrariComponent;
  let fixture: ComponentFixture<OrariComponent>;
  let orarioService: OrarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [OrarioService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrariComponent);
    component = fixture.componentInstance;
    orarioService = TestBed.inject(OrarioService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOrariForRistorante on ngOnInit', async () => {
    const restaurantId = 1;
    const orari = [
      {
        id_day: 1,
        name: 'Monday',
        opening_time: '08:00',
        closing_time: '18:00',
      },
      {
        id_day: 2,
        name: 'Tuesday',
        opening_time: '08:00',
        closing_time: '18:00',
      },
    ];
    spyOn(orarioService, 'getOrariByRestaurantId').and.returnValue(
      Promise.resolve(orari),
    );
    component.ristoranteId = restaurantId;
    await component.ngOnInit();
    expect(orarioService.getOrariByRestaurantId).toHaveBeenCalledWith(
      restaurantId,
    );
    expect(component.orari).toEqual(orari);
  });

  it('should set orari property with result from service', async () => {
    const restaurantId = 1;
    const orari = [
      {
        id_day: 1,
        name: 'Monday',
        opening_time: '08:00',
        closing_time: '18:00',
      },
      {
        id_day: 2,
        name: 'Tuesday',
        opening_time: '08:00',
        closing_time: '18:00',
      },
    ];
    spyOn(orarioService, 'getOrariByRestaurantId').and.returnValue(
      Promise.resolve(orari),
    );
    component.ristoranteId = restaurantId;
    await component.getOrariForRistorante(component.ristoranteId);
    expect(component.orari).toEqual(orari);
  });

  it('should handle error when retrieving orari', async () => {
    const restaurantId = 1;
    const errorMessage = 'Error retrieving orari';
    spyOn(orarioService, 'getOrariByRestaurantId').and.returnValue(
      Promise.reject(errorMessage),
    );
    spyOn(console, 'error');
    component.ristoranteId = restaurantId;
    await component.ngOnInit();
    expect(orarioService.getOrariByRestaurantId).toHaveBeenCalledWith(
      restaurantId,
    );
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il recupero degli orari:',
      errorMessage,
    );
  });
});
