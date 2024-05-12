import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { SubmitService } from '../../services/lib/submit.service';
import { LoginComponent } from '../form/login/login.component';
import { Authentication, User } from '../../interfaces/authentication';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/lib/message.service';

@Component({
  selector: 'app-loginCliente',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './login-cliente.component.html',
  styleUrl: './login-cliente.component.css',
})
export class LoginClienteComponent {
  login_service: SubmitService<Authentication, User> = inject(SubmitService);
  auth = inject(AuthService);
  router = inject(Router);
  ms = inject(MessageService);

  /**
   * Esegue il form, ovvero effettua il login del cliente
   * @param FormGroup - Il form con i campi email e password validati
   */
  on_submit(form: FormGroup) {
    const email: string = form.value.email ?? '';
    const password: string = form.value.password ?? '';

    this.login_service
      .api('/authentication/signin-user')
      .field('user')
      .post({ email, password })
      .then((_) => {
        this.ms.log('Utente autenticato');
        this.auth.auth();
        this.router.navigate(['cliente/home']);
      })
      .catch((_) => {
        this.ms.error("Errore durante l'autenticazione");
      });
  }
}
