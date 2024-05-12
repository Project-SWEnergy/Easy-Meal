import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrazioneClienteComponent } from './registrazione-cliente.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrazioneComponent', () => {
  let component: RegistrazioneClienteComponent;
  let fixture: ComponentFixture<RegistrazioneClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrazioneClienteComponent, BrowserAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrazioneClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
