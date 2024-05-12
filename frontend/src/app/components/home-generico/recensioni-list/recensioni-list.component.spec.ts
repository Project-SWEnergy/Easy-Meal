import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecensioniListComponent } from './recensioni-list.component';
import { RecensioniService } from '../../../services/home-generico/recensioni.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('RecensioniListComponent', () => {
  let component: RecensioniListComponent;
  let fixture: ComponentFixture<RecensioniListComponent>;
  let recensioniService: RecensioniService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [], // Aggiungi la dichiarazione del componente
      imports: [CommonModule],
      providers: [RecensioniService],
    }).compileComponents();

    recensioniService = TestBed.inject(RecensioniService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecensioniListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadRecensione on ngOnInit', async () => {
    const restaurantId = 1;
    spyOn(recensioniService, 'getReviewByRestaurantId').and.returnValue(
      Promise.resolve([]),
    ); // Modifica il nome del metodo al servizio
    component.ristoranteId = restaurantId;
    await component.ngOnInit();
    expect(recensioniService.getReviewByRestaurantId).toHaveBeenCalledWith(
      restaurantId,
    ); // Modifica il nome del metodo al servizio
  });

  it('should set recensioni property with result from service', async () => {
    const recensioni = [
      {
        id_restaurant: 1,
        name_restaurant: 'Bella Napoli',
        id_user: 1,
        name_user: 'Luca',
        date: '2024-05-10',
        score: 8,
        description: 'Great food',
      },
      {
        id_restaurant: 1,
        name_restaurant: 'Bella Padova',
        id_user: 2,
        name_user: 'Mario',
        date: '2024-05-12',
        score: 9,
        description: 'Excellent service',
      },
    ];
    spyOn(recensioniService, 'getReviewByRestaurantId').and.returnValue(
      Promise.resolve(recensioni),
    ); // Modifica il nome del metodo al servizio
    component.ristoranteId = 1;
    await component.loadRecensione(component.ristoranteId);
    expect(component.recensioni).toEqual(recensioni);
  });

  it('should handle error when retrieving recensioni', async () => {
    const errorMessage = 'Error retrieving recensioni';
    spyOn(recensioniService, 'getReviewByRestaurantId').and.returnValue(
      Promise.reject(errorMessage),
    ); // Modifica il nome del metodo al servizio
    spyOn(console, 'error');
    component.ristoranteId = 1;
    await component.loadRecensione(component.ristoranteId);
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il caricamento delle recensioni:',
      errorMessage,
    );
  });
});
