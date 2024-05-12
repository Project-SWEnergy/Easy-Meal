import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Provides stubs for router-outlet and router-link
        HeaderComponent,
        FooterComponent,
        MessageComponent,
        AppComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Easy Meal'`, () => {
    expect(app.title).toEqual('Easy Meal');
  });

  it('should include router-outlet for routing content', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull();
  });

  it('should include the header component', () => {
    const headerDe = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerDe).not.toBeNull();
  });

  it('should include the footer component', () => {
    const footerDe = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerDe).not.toBeNull();
  });

  it('should include the message component', () => {
    const messageDe = fixture.debugElement.query(
      By.directive(MessageComponent),
    );
    expect(messageDe).not.toBeNull();
  });
});
