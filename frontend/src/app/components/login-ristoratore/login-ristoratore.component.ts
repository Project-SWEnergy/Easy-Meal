import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { LoginComponent } from '../form/login/login.component';
import { SubmitService } from '../../services/lib/submit.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loginRistoratore',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './login-ristoratore.component.html',
  styleUrl: './login-ristoratore.component.css',
})
export class LoginRistoratoreComponent {
  submit = inject(SubmitService);
  router = inject(Router);
  auth = inject(AuthService);

  public hidePassword: boolean = true;

  /**
   * Esegue il form, ovvero effettua il login del cliente
   * @param FormGroup - Il form con i campi email e password validati
   */
  on_submit(form: FormGroup) {
    const email: string = form.value.email ?? '';
    const password: string = form.value.password ?? '';

    this.submit
      .api('authentication/signin-restaurant')
      .field('user')
      .post({ email: email, password: password })
      .then(async (_) => {
        await this.auth.auth();
        this.router.navigate(['ristoratore/home']);
      });
  }
}