import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderedDish } from '../../../interfaces/order';
import { OrderService } from '../../../services/home-cliente/order.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() reservationId: number | undefined;
  orderedDishes: OrderedDish[] = [];
  userList: { id_user: number; name_user: string; surname_user: string }[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    if (this.reservationId) {
      this.loadOrderedDishes(this.reservationId);
    }
  }

  loadOrderedDishes(reservationId: number): void {
    this.orderService
      .getOrderedDishesByReservation(reservationId)
      .then((data: OrderedDish[]) => {
        this.orderedDishes = data;
        this.userList = this.getUserList();
      })
      .catch((error) => {
        // Gestire eventuali errori qui
        console.error('Errore nel caricamento dei piatti ordinati:', error);
      });
  }

  getUserList(): {
    id_user: number;
    name_user: string;
    surname_user: string;
  }[] {
    const userList: {
      id_user: number;
      name_user: string;
      surname_user: string;
    }[] = [];
    this.orderedDishes.forEach((dish) => {
      const userExists = userList.some((user) => user.id_user === dish.id_user);
      if (!userExists) {
        userList.push({
          id_user: dish.id_user,
          name_user: dish.name_user,
          surname_user: dish.surname_user,
        });
      }
    });
    return userList;
  }

  getOrderedDishesByUser(userId: number): OrderedDish[] {
    return this.orderedDishes.filter((dish) => dish.id_user === userId);
  }

  refreshOrderedDishes(): void {
    if (this.reservationId) {
      this.ngOnInit();
    }
  }
}
