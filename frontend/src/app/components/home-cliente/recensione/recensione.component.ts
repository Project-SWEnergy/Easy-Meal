import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RecensioneService } from '../../../services/home-cliente/recensione.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageService } from '../../../services/lib/message.service';

@Component({
  selector: 'app-recensione',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './recensione.component.html',
  styleUrl: './recensione.component.css',
})
export class RecensioneComponent implements OnInit {
  punteggio: any;
  idRestaurant: number;
  form: FormGroup;

  ms = inject(MessageService);

  constructor(
    private recensioneService: RecensioneService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.idRestaurant = Number(this.route.snapshot.params['id']);
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      punteggio: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      descrizione: ['', Validators.required],
    });
  }

  inviaRecensione(): void {
    if (this.form.valid) {
      const punteggio = this.form.get('punteggio')?.value;
      const descrizione = this.form.get('descrizione')?.value;
      this.recensioneService
        .creaRecensione(punteggio, this.idRestaurant, descrizione)
        .then((response) => {
          this.ms.log('Recensione inviata con successo');
        })
        .catch((error) => {
          this.ms.error("Errore durante l'invio della recensione");
        });
    }
  }
}
