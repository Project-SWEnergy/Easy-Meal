import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrazioneClienteFormComponent } from './registrazione-cliente.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrazioneClienteComponent', () => {
  let component: RegistrazioneClienteFormComponent;
  let fixture: ComponentFixture<RegistrazioneClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrazioneClienteFormComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrazioneClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit form on submit when form is valid', () => {
    const router = TestBed.inject(Router); // Inject Router
    spyOn(router, 'navigateByUrl'); // Mock navigateByUrl method

    const onSubmitSpy = spyOn(component.onSubmit, 'emit').and.callThrough();

    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      email: 'test@example.com',
      password: 'password',
    });

    component.on_submit();

    expect(onSubmitSpy).toHaveBeenCalledWith(component.form);
    expect(router.navigateByUrl).not.toHaveBeenCalled(); // Make sure navigateByUrl is not called
  });

  it('should not emit form on submit when form is invalid', () => {
    const onSubmitSpy = spyOn(component.onSubmit, 'emit').and.callThrough();

    component.form.setValue({
      name: '', // Empty name
      surname: '', // Empty surname
      email: 'test@example', // Invalid email format
      password: '', // Empty password
    });

    component.on_submit();

    expect(onSubmitSpy).not.toHaveBeenCalled();
  });
});
