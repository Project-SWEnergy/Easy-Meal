import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { RegistrazioneClienteFormComponent } from '../form/registrazione-cliente/registrazione-cliente.component';
import { SubmitService } from '../../services/lib/submit.service';
import { SignonCliente } from '../../interfaces/signon-cliente';
import { User } from '../../interfaces/authentication';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/lib/message.service';

@Component({
  selector: 'app-registrazioneCliente',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RegistrazioneClienteFormComponent],
  templateUrl: './registrazione-cliente.component.html',
  styleUrl: './registrazione-cliente.component.css',
})
export class RegistrazioneClienteComponent {
  constructor() { }

  auth = inject(AuthService);
  submit: SubmitService<SignonCliente, User> = inject(SubmitService);
  router = inject(Router);
  ms = inject(MessageService);

  /**
   * Esegue il form, ovvero effettua il login del cliente
   * @param FormGroup - Il form con i campi email e password validati
   */
  on_submit(form: FormGroup): void {
    this.submit
      .api('users/create')
      .field('user')
      .post(form.value)
      .then((_) => {
        this.auth.auth();
        this.router.navigate(['cliente/home']);
        this.ms.log('Account creato con successo');
      })
      .catch((err) => {
        this.ms.error("Errore durante la creazione dell'account");
      });
  }
}
