import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RistorantiComponent } from './ristoranti.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndirizzoComponent } from '../indirizzo/indirizzo.component';
import { TagCucinaComponent } from '../tag-cucina/tag-cucina.component';
import { Ristorante } from '../../../interfaces/ristoranti';
import { Indirizzo } from '../../../interfaces/address';
import { of } from 'rxjs';
import { IndirizzoService } from '../../../services/home-generico/indirizzo.service';

describe('RistorantiComponent', () => {
  let component: RistorantiComponent;
  let fixture: ComponentFixture<RistorantiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        RouterModule.forRoot([]),
        RistorantiComponent,
        IndirizzoComponent,
        TagCucinaComponent,
      ],
      providers: [
        { provide: IndirizzoService, useClass: MockIndirizzoService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RistorantiComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ristoranti list', () => {
    const ristoranti: Ristorante[] = [
      {
        id: 1,
        email: 'ristorante1@example.com',
        name: 'Ristorante 1',
        owner_name: 'Mario',
        owner_surname: 'Rossi',
        id_address: 1,
        seats: 50,
        website: 'http://www.ristorante1.com',
        price_tier: 2,
        description: 'Ristorante di cucina italiana',
        phone: '123456789',
        childrenn_seats: 10,
        accessibility: true,
        logo: 'path/to/logo1.png',
        banner_image: 'path/to/banner1.png',
      },
    ];
    component.ristoranti = ristoranti;
    fixture.detectChanges();

    const ristorantiElements =
      fixture.nativeElement.querySelectorAll('.listing');
    expect(ristorantiElements.length).toEqual(ristoranti.length);

    ristoranti.forEach((ristorante, index) => {
      const ristoranteElement = ristorantiElements[index];
      expect(
        ristoranteElement.querySelector('.listing-heading').textContent,
      ).toContain(ristorante.name);
    });
  });

  it('should integrate with IndirizzoComponent', () => {
    const ristorante: Ristorante = {
      id: 1,
      email: 'ristorante1@example.com',
      name: 'Ristorante 1',
      owner_name: 'Mario',
      owner_surname: 'Rossi',
      id_address: 1,
      seats: 50,
      website: 'http://www.ristorante1.com',
      price_tier: 2,
      description: 'Ristorante di cucina italiana',
      phone: '123456789',
      childrenn_seats: 10,
      accessibility: true,
      logo: 'path/to/logo1.png',
      banner_image: 'path/to/banner1.png',
    };

    component.ristoranti = [ristorante];
    fixture.detectChanges();

    const indirizzoComponent =
      fixture.nativeElement.querySelector('app-indirizzo');
    expect(indirizzoComponent).toBeTruthy();
  });
});

// Mock services

class MockIndirizzoService {
  getAddressByRestaurantId(id: number) {
    const indirizzo: Indirizzo = {
      id: 1,
      city: 'Roma',
      street: 'Via Roma',
      street_number: '1',
      state: 'Italy',
      zip_code: '00100',
    };
    return of(indirizzo);
  }
}
