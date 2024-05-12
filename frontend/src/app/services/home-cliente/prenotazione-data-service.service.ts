import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioneDataService {
  private idReservation: number;
  private idUser: number;
  private idRestaurant: number;
  private billSplittingMethod: string;
  private participants: number;
  private localStorageKey = 'prenotazioneData';

  constructor() {}

  // Metodo per salvare i dati nel localStorage
  private saveToLocalStorage(data: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  // Metodo per caricare i dati dal localStorage
  loadFromLocalStorage(): any {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : null;
  }

  setIdReservation(id: number): void {
    const prenotazioneData = this.loadFromLocalStorage() || {};
    prenotazioneData.idReservation = id;
    this.saveToLocalStorage(prenotazioneData);
  }

  getIdReservation(): number {
    const prenotazioneData = this.loadFromLocalStorage();
    return prenotazioneData ? prenotazioneData.idReservation : null;
  }

  setIdUser(id: number): void {
    const prenotazioneData = this.loadFromLocalStorage() || {};
    prenotazioneData.idUser = id;
    this.saveToLocalStorage(prenotazioneData);
  }

  getIdUser(): number {
    const prenotazioneData = this.loadFromLocalStorage();
    return prenotazioneData ? prenotazioneData.idUser : null;
  }

  setIdRestaurant(id: number): void {
    const prenotazioneData = this.loadFromLocalStorage() || {};
    prenotazioneData.idRestaurant = id;
    this.saveToLocalStorage(prenotazioneData);
  }

  getIdRestaurant(): number {
    const prenotazioneData = this.loadFromLocalStorage();
    return prenotazioneData ? prenotazioneData.idRestaurant : null;
  }

  setBillSplittingMethod(method: string): void {
    const prenotazioneData = this.loadFromLocalStorage() || {};
    prenotazioneData.billSplittingMethod = method;
    this.saveToLocalStorage(prenotazioneData);
  }

  getBillSplittingMethod(): string {
    const prenotazioneData = this.loadFromLocalStorage();
    return prenotazioneData ? prenotazioneData.billSplittingMethod : null;
  }

  setParticipants(count: number): void {
    const prenotazioneData = this.loadFromLocalStorage() || {};
    prenotazioneData.participants = count;
    this.saveToLocalStorage(prenotazioneData);
  }

  getParticipants(): number {
    const prenotazioneData = this.loadFromLocalStorage();
    return prenotazioneData ? prenotazioneData.participants : null;
  }
}
