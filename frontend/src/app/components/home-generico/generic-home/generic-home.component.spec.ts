import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Ristorante } from '../../../interfaces/ristoranti';
import { GenericHomeComponent } from './generic-home.component';
import { RistorantiService } from '../../../services/home-generico/ristoranti.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('GenericHomeComponent', () => {
  let component: GenericHomeComponent;
  let fixture: ComponentFixture<GenericHomeComponent>;
  let ristorantiServiceSpy: jasmine.SpyObj<RistorantiService>;

  const mockRistoranti: Ristorante[] = [
    {
      id: 1,
      email: 'ristorante1@example.com',
      name: 'Ristorante 1',
      owner_name: 'Proprietario1',
      owner_surname: 'CognomeProprietario1',
      id_address: 1,
      seats: 50,
      website: 'http://www.ristorante1.com',
      price_tier: 2,
      description: 'Descrizione del Ristorante 1',
      phone: '123456789',
      childrenn_seats: 10,
      accessibility: true,
      logo: 'logo_ristorante1.jpg',
      banner_image: 'banner_ristorante1.jpg',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RistorantiService', [
      'getAllRestaurants',
    ]);
    await TestBed.configureTestingModule({
      declarations: [], // Aggiungi la dichiarazione del componente
      imports: [CommonModule],
      providers: [
        { provide: RistorantiService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1', // Forniamo un mock per il parametro 'id'
              },
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(GenericHomeComponent);
    component = fixture.componentInstance;
    ristorantiServiceSpy = TestBed.inject(
      RistorantiService,
    ) as jasmine.SpyObj<RistorantiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch ristoranti on initialization', async () => {
    ristorantiServiceSpy.getAllRestaurants.and.returnValue(
      Promise.resolve(mockRistoranti),
    );
    await component.fetchRistoranti(); // Chiamiamo il metodo fetchRistoranti esplicitamente
    fixture.detectChanges();
    expect(component.ristorantiList).toEqual(mockRistoranti);
    expect(component.filteredRistorantiList).toEqual(mockRistoranti);
  });

  it('should handle error during fetch ristoranti', async () => {
    const errorMessage = 'Error fetching ristoranti';
    ristorantiServiceSpy.getAllRestaurants.and.returnValue(
      Promise.reject(errorMessage),
    );

    spyOn(console, 'error');

    await component.fetchRistoranti();

    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il recupero dei ristoranti:',
      errorMessage,
    );
  });

  it('should filter ristoranti by name when text is provided', () => {
    component.ristorantiList = [
      {
        id: 1,
        email: 'ristorante1@example.com',
        name: 'Ristorante 1',
        owner_name: 'Proprietario1',
        owner_surname: 'CognomeProprietario1',
        id_address: 1,
        seats: 50,
        website: 'http://www.ristorante1.com',
        price_tier: 2,
        description: 'Descrizione del Ristorante 1',
        phone: '123456789',
        childrenn_seats: 10,
        accessibility: true,
        logo: 'logo_ristorante1.jpg',
        banner_image: 'banner_ristorante1.jpg',
      },
    ];
    component.filterResultsByName('Ristorante');
    expect(component.filteredRistorantiList.length).toBe(1);
    expect(component.filteredRistorantiList[0].name).toBe('Ristorante 1');
  });

  it('should reset filtered ristoranti list when filter text is null or empty', () => {
    component.ristorantiList = [
      {
        id: 1,
        email: 'ristorante1@example.com',
        name: 'Ristorante 1',
        owner_name: 'Proprietario1',
        owner_surname: 'CognomeProprietario1',
        id_address: 1,
        seats: 50,
        website: 'http://www.ristorante1.com',
        price_tier: 2,
        description: 'Descrizione del Ristorante 1',
        phone: '123456789',
        childrenn_seats: 10,
        accessibility: true,
        logo: 'logo_ristorante1.jpg',
        banner_image: 'banner_ristorante1.jpg',
      },
    ];
    component.filterResultsByName('Ristorante');
    expect(component.filteredRistorantiList.length).toBe(1);

    component.filterResultsByName('');
    expect(component.filteredRistorantiList).toEqual(component.ristorantiList);
  });

  it('should render ristoranti in the view', async () => {
    ristorantiServiceSpy.getAllRestaurants.and.returnValue(
      Promise.resolve(mockRistoranti),
    );
    await component.fetchRistoranti();
    fixture.detectChanges();

    const ristorantiElements = fixture.debugElement.queryAll(
      By.css('.listing-heading'),
    );
    expect(ristorantiElements.length).toBe(mockRistoranti.length);
    ristorantiElements.forEach((element, index) => {
      expect(element.nativeElement.textContent).toContain(
        mockRistoranti[index].name,
      );
    });
  });

  // Test per coprire il caso in cui il servizio restituisce null durante il recupero dei ristoranti
  it('should handle null result during fetch ristoranti', async () => {
    ristorantiServiceSpy.getAllRestaurants.and.returnValue(
      Promise.resolve(null as any),
    );

    await component.fetchRistoranti();

    expect(component.ristorantiList).toEqual([]);
    expect(component.filteredRistorantiList).toEqual([]);
  });

  // Test per coprire il caso in cui il testo passato alla funzione filterResultsByName è null o undefined
  it('should reset filtered ristoranti list when filter text is null or undefined', () => {
    component.ristorantiList = mockRistoranti;

    component.filterResultsByName('');
    expect(component.filteredRistorantiList).toEqual(mockRistoranti);
  });

  // Test per coprire il caso in cui il testo passato alla funzione filterResultsByName non corrisponde a nessun ristorante
  it('should not filter ristoranti when filter text does not match any ristorante', () => {
    component.ristorantiList = mockRistoranti;

    component.filterResultsByName('Non esistente');
    expect(component.filteredRistorantiList).toEqual([]);
  });

  it('should handle empty result during fetch ristoranti', async () => {
    ristorantiServiceSpy.getAllRestaurants.and.returnValue(Promise.resolve([]));

    await component.fetchRistoranti();

    expect(component.ristorantiList).toEqual([]);
    expect(component.filteredRistorantiList).toEqual([]);
  });

  it('should filter ristoranti by name in a case-insensitive manner', () => {
    component.ristorantiList = [
      {
        id: 1,
        email: 'ristorante1@example.com',
        name: 'Ristorante 1',
        owner_name: 'Proprietario1',
        owner_surname: 'CognomeProprietario1',
        id_address: 1,
        seats: 50,
        website: 'http://www.ristorante1.com',
        price_tier: 2,
        description: 'Descrizione del Ristorante 1',
        phone: '123456789',
        childrenn_seats: 10,
        accessibility: true,
        logo: 'logo_ristorante1.jpg',
        banner_image: 'banner_ristorante1.jpg',
      },
    ];

    component.filterResultsByName('ristorante');
    expect(component.filteredRistorantiList.length).toBe(1);

    component.filterResultsByName('RISTORANTE');
    expect(component.filteredRistorantiList.length).toBe(1);

    component.filterResultsByName('1');
    expect(component.filteredRistorantiList.length).toBe(1);

    component.filterResultsByName('Non esistente');
    expect(component.filteredRistorantiList.length).toBe(0);
  });
});
