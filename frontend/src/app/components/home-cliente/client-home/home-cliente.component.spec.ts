import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeClienteComponent } from './home-cliente.component';
import { CommonModule } from '@angular/common';
import { GenericHomeComponent } from '../../home-generico/generic-home/generic-home.component';
import { RistorantiComponent } from '../../home-generico/ristoranti/ristoranti.component';
import { RistorantiService } from '../../../services/home-generico/ristoranti.service';

describe('HomeClienteComponent', () => {
  let component: HomeClienteComponent;
  let fixture: ComponentFixture<HomeClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, RouterTestingModule.withRoutes([])],
      providers: [RistorantiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain GenericHomeComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-generic-home')).toBeTruthy();
  });
});
