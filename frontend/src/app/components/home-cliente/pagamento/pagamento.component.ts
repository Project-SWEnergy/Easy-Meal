import { Component, Input, OnInit, inject } from '@angular/core';
import { OrderedDish } from '../../../interfaces/order';
import { OrderService } from '../../../services/home-cliente/order.service';
import { PagamentoService } from '../../../services/home-cliente/pagamento.service';
import {
  ResultPrenotazioneBill,
  ResultPrenotazioni,
  PrenotazioneBill,
  UserBill,
} from '../../../interfaces/pagamento';
import { AuthService } from '../../../services/auth.service';
import { PrenotazioneDataService } from '../../../services/home-cliente/prenotazione-data-service.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/lib/message.service';
import { PrenotazioneService } from '../../../services/home-cliente/prenotazione.service';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
})
export class PagamentoComponent {
  reservationId: number;
  bill_splitting: string;
  partecipants: number;
  user_id: number;
  hasUserPaid: boolean = false;

  individualUserTotalBill: number | undefined;
  reservationTotalBill: number | undefined;

  orderedDishes: OrderedDish[] = [];
  unpaidDishes: OrderedDish[] = [];

  ms = inject(MessageService);

  constructor(
    private router: Router,
    private orderService: OrderService,
    private pagamentoService: PagamentoService,
    private auth: AuthService,
    private prenotazioneDataService: PrenotazioneDataService,
    private prenotazioneService: PrenotazioneService,
  ) {
    this.user_id = this.auth.get()!.id;

    this.reservationId = this.prenotazioneDataService.getIdReservation();
    this.bill_splitting = this.prenotazioneDataService.getBillSplittingMethod();
  }

  ngOnInit(): void {
    if (this.reservationId) {
      this.loadOrderedDishes(this.reservationId);
    }

    if (this.bill_splitting === 'Individuale') {
      this.pagamentoIndividuale();
    } else if (this.bill_splitting === 'Equidiviso') {
      this.equalBillPaid(this.reservationId);
      this.loadPartecipants();
      this.pagamentoEquidiviso();
    }
  }

  async loadPartecipants(): Promise<void> {
    try {
      this.partecipants = await this.prenotazioneDataService.getParticipants()
    } catch (error) {
      console.error('Errore durante il recupero dei partecipanti:', error);
    }
  }

  pagamentoIndividuale(): void {
    this.pagamentoService
      .getUserTotalBill(this.reservationId)
      .then((data: ResultPrenotazioneBill<UserBill[]>) => {
        if (data.result && data.data.length > 0) {
          this.individualUserTotalBill = parseFloat(data.data[0].total_bill);
        }
      })
      .catch((error) => {
        console.error("Errore nel recupero del saldo dell'utente:", error);
      });
  }

  pagamentoEquidiviso(): void {
    this.pagamentoService
      .getReservationTotalBill(this.reservationId)
      .then((data: ResultPrenotazioni<PrenotazioneBill[]>) => {
        if (data.result && data.data.length > 0) {
          this.reservationTotalBill = parseFloat(data.data[0].total_bill);
          this.individualUserTotalBill = parseFloat(
            (this.reservationTotalBill / this.partecipants).toFixed(2),
          );
        }
      })
      .catch((error) => {
        console.error(
          'Errore nel recupero del saldo totale della prenotazione:',
          error,
        );
      });
  }

  loadOrderedDishes(reservationId: number): void {
    this.orderService
      .getOrderedDishesByUser(reservationId)
      .then((data: OrderedDish[]) => {
        this.orderedDishes = data;
        // Filtra i piatti non pagati
        this.unpaidDishes = this.orderedDishes.filter((dish) => !dish.paid);
      })
      .catch((error) => {
        console.error('Errore nel caricamento dei piatti ordinati:', error);
      });
  }

  effettuaPagamento(): void {
    if (this.bill_splitting === 'Individuale') {
      this.createIndividualBill();
    } else if (this.bill_splitting === 'Equidiviso') {
      this.createEqualBill();
    }
    this.unpaidDishes = [];
  }

  createIndividualBill(): void {
    const billData = {
      id_user: this.user_id,
      id_reservation: this.reservationId,
      date: new Date().toISOString(),
      total_bill: this.individualUserTotalBill!,
      bill_state: 'In corso',
      id_ordered_dishes: this.getOrderDishesIds(),
    };

    this.pagamentoService
      .createIndividualBill(billData)
      .then((response) => {
        this.ms.log('Pagamento individuale effettuato con successo');
      })
      .catch((error) => {
        this.ms.error('Errore durante il pagamento individuale');
      });
  }

  createEqualBill(): void {
    const billData = {
      id_user: this.user_id,
      id_reservation: this.reservationId,
      date: new Date().toISOString(),
      total_bill: this.individualUserTotalBill!,
      bill_state: 'In corso',
    };

    this.pagamentoService
      .createEqualBill(billData)
      .then((response) => {
        this.ms.log('Pagamento equidiviso effettuato con successo');
        this.router.navigate(['/pagamento']).then(() => {
          location.reload();
        });
      })
      .catch((error) => {
        this.ms.error('Errore durante il pagamento equidiviso');
      });
  }

  getOrderDishesIds(): number[] {
    const dishIds: number[] = [];
    for (const dish of this.orderedDishes) {
      dishIds.push(dish.id);
    }
    return dishIds;
  }

  async equalBillPaid(reservationId: number): Promise<void> {
    try {
      this.hasUserPaid = await this.pagamentoService.hasUserPaidForReservation(reservationId);
    } catch (error) {
      console.error('Errore durante la verifica del pagamento:', error);
    }
  }
}
