import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RistorantiService } from '../../../services/home-generico/ristoranti.service';
import { OrderService } from '../../../services/home-cliente/order.service';

import { Ristorante } from '../../../interfaces/ristoranti';
import { Indirizzo } from '../../../interfaces/address';

import { IndirizzoComponent } from '../indirizzo/indirizzo.component';
import { TagCucinaComponent } from '../tag-cucina/tag-cucina.component';
import { OrariComponent } from '../orari/orari.component';
import { MenuComponent } from '../../home-generico/menu-generico/menu.component';
import { RecensioniListComponent } from '../recensioni-list/recensioni-list.component';

import { AuthService } from '../../../services/auth.service';
import { inject } from '@angular/core';
import { RecensioniService } from '../../../services/home-generico/recensioni.service';

@Component({
  standalone: true,
  imports: [
    IndirizzoComponent,
    CommonModule,

    TagCucinaComponent,
    OrariComponent,
    MenuComponent,
    RecensioniListComponent,
  ],
  selector: 'app-dettagli-ristoranti',
  templateUrl: './dettagli-ristoranti.component.html',
  styleUrls: ['./dettagli-ristoranti.component.css'],
})
export class DettagliRistorantiComponent implements OnInit {
  ristorante: Ristorante | undefined;
  indirizzo: Indirizzo | undefined;
  hasUserReviewd = false
  userPaid = false;
  auth = inject(AuthService);
  orderService: OrderService;
  reviews = inject(RecensioniService)

  constructor(
    private route: ActivatedRoute,
    private ristorantiService: RistorantiService,
    private router: Router,
  ) {
    if (this.auth.isAuth()) {
      this.orderService = inject(OrderService);
    }
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.getRestaurantDetails(id);
    if (this.auth.isAuth()) {
      this.checkUserPayment(id);
    }

    this.reviews.hasUserReviewed(id).then(res => {
      this.hasUserReviewd = res
    })
  }

  async getRestaurantDetails(id: number): Promise<void> {
    try {
      const ristorante: Ristorante | undefined =
        await this.ristorantiService.getRestaurantById(id);
      this.ristorante = ristorante;
    } catch (error) {
      console.error('Errore durante il recupero del ristorante:', error);
    }
  }

  async checkUserPayment(id: number): Promise<void> {
    const idRestaurant = id;
    if (idRestaurant) {
      try {
        this.userPaid = await this.orderService.didUserPaid(idRestaurant);
      } catch (error) {
        console.error('Errore durante il controllo del pagamento:', error);
      }
    }
  }

  goToReviewPage(id: number): void {
    this.router.navigate(['/recensione', id]);
  }

  goToReservationPage(id: number): void {
    this.router.navigate(['/prenota', id]);
  }
}
