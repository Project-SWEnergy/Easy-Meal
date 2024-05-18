import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dish } from '../../../interfaces/dish';
import { MenuService } from '../../../services/home-generico/menu.service';
import { IngredientiListComponent } from '../../home-generico/ingredienti-list-generico/ingredienti-list.component';
import { CarrelloService } from '../../../services/home-cliente/carrello.service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [CommonModule, IngredientiListComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() ristoranteId: number | undefined;
  menu: Dish[] = [];

  constructor(
    private menuService: MenuService,
    private cartService: CarrelloService,
  ) {}

  ngOnInit(): void {
    if (this.ristoranteId) {
      this.loadMenu(this.ristoranteId);
    }
  }

  async loadMenu(ristoranteId: number): Promise<void> {
    try {
      const menu: Dish[] =
        await this.menuService.getMenuByRestaurantId(ristoranteId);
      this.menu = menu;
    } catch (error) {
      console.error('Errore durante il caricamento del menu:', error);
    }
  }

  addToCart(
    dishId: number,
    dishName: string,
    dishImage: string,
    dishPrice: number,
  ): void {
    this.cartService.addToCart(dishId, dishName, dishImage, dishPrice);
  }

  removeFromCart(dishId: number): void {
    this.cartService.removeFromCart(dishId);
  }
}
