/*
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RecensioneComponent } from './recensione.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecensioneService } from '../../../services/home-cliente/recensione.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('RecensioneComponent', () => {
  let component: RecensioneComponent;
  let fixture: ComponentFixture<RecensioneComponent>;
  let recensioneServiceSpy: jasmine.SpyObj<RecensioneService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const recensioneService = jasmine.createSpyObj('RecensioneService', [
      'creaRecensione',
    ]);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: RecensioneService, useValue: recensioneService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
      ],
    }).compileComponents();

    recensioneServiceSpy = TestBed.inject(
      RecensioneService,
    ) as jasmine.SpyObj<RecensioneService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecensioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('punteggio')).toBeDefined();
    expect(component.form.get('descrizione')).toBeDefined();
  });

  it('should invoke RecensioneService.creaRecensione when form is valid', () => {
    component.form.setValue({ punteggio: 5, descrizione: 'Test description' });
    recensioneServiceSpy.creaRecensione.and.returnValue(
      Promise.resolve({ result: true, message: 'Success', data: {} }),
    );
    component.inviaRecensione();
    expect(recensioneServiceSpy.creaRecensione).toHaveBeenCalledWith(
      5,
      1,
      'Test description',
    );
  });

  it('should invoke RecensioneService.creaRecensione and show success alert when form is valid and submission is successful', async () => {
    component.form.setValue({ punteggio: 5, descrizione: 'Test description' });
    recensioneServiceSpy.creaRecensione.and.returnValue(
      Promise.resolve({ result: true, message: 'Success', data: {} }),
    );
    spyOn(window, 'alert');
    await component.inviaRecensione();
    expect(recensioneServiceSpy.creaRecensione).toHaveBeenCalledWith(
      5,
      1,
      'Test description',
    );
    // expect(window.alert).toHaveBeenCalledWith(
    //   'Recensione inviata con successo',
    // );
  });

  it('should invoke RecensioneService.creaRecensione and show error alert when form is valid and submission fails', async () => {
    component.form.setValue({ punteggio: 5, descrizione: 'Test description' });
    recensioneServiceSpy.creaRecensione.and.returnValue(
      Promise.reject('Test error'),
    );
    spyOn(window, 'alert');
    await component.inviaRecensione();
    await fixture.whenStable(); // attendiamo finché la promessa non viene rigettata
    expect(recensioneServiceSpy.creaRecensione).toHaveBeenCalledWith(
      5,
      1,
      'Test description',
    );
    // expect(window.alert).toHaveBeenCalledWith(
    //   "C'è stato un problema con l'invio della recensione",
    // );
  });
});

*/