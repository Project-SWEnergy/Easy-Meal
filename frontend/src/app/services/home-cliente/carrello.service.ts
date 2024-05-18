import { Injectable } from '@angular/core';
import axios from '../../../../axios-config';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  private carrello: any[] = [];
  private currentId: number = 1;

  constructor() {
    // Carica il carrello dal local storage all'avvio del servizio
    this.carrello = JSON.parse(localStorage.getItem('carrello') || '[]');
  }

  private saveToLocalStorage(): void {
    // Salva il carrello nel local storage
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  addToCart(
    id_dish: number,
    dishName: string,
    dishImage: string,
    dishPrice: number,
  ): void {
    const uniqueId = this.currentId++;
    this.carrello.push({
      uniqueId,
      id_dish,
      dishName,
      dishImage,
      dishPrice,
      removed_ingredients: [],
      removedIngredientNames: [],
    });
    this.saveToLocalStorage();
  }

  removeFromCart(id_dish: number): void {
    const index = this.carrello.findIndex((item) => item.id_dish === id_dish);
    if (index !== -1) {
      this.carrello.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  removeIngredientFromCart(
    uniqueId: number,
    ingredientId: number,
    ingredientName: string,
  ): void {
    const index = this.carrello.findIndex((item) => item.uniqueId === uniqueId);
    if (index !== -1) {
      const removedIngredients = this.carrello[index].removed_ingredients;
      let removedIngredientNames = this.carrello[index].removedIngredientNames;
      // Assicuriamoci che removedIngredientNames sia un array prima di chiamare push
      if (!removedIngredientNames) {
        removedIngredientNames = [];
      }
      removedIngredients.push(ingredientId);
      removedIngredientNames.push(ingredientName);
      this.saveToLocalStorage();
    }
  }

  inviaOrdine(carrelloDaInviare: any[]): Promise<any> {
    const url = 'ordered-dishes/create';
    return axios.post(url, carrelloDaInviare);
  }

  cancellaOrdine(idReservation: number): Promise<any> {
    const requestData = [{ id_reservation: idReservation }];
    const url = 'ordered-dishes/create';
    return axios.post(url, requestData);
  }

  getCarrello(): any[] {
    return this.carrello;
  }

  clearCarrello(): any {
    this.carrello = [];
    this.saveToLocalStorage();
  }
}
