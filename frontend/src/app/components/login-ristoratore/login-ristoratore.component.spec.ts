import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRistoratoreComponent } from './login-ristoratore.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginRistoratoreComponent;
  let fixture: ComponentFixture<LoginRistoratoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRistoratoreComponent, BrowserAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRistoratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
