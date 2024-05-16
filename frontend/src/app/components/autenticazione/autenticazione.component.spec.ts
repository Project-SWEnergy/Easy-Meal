import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticazioneComponent } from './autenticazione.component';
import { provideRouter } from '@angular/router';

describe('AutenticazioneComponent', () => {
  let component: AutenticazioneComponent;
  let fixture: ComponentFixture<AutenticazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutenticazioneComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AutenticazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
