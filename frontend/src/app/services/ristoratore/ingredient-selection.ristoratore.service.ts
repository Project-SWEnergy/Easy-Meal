import { Injectable } from '@angular/core';

export interface Observer {
  update(): void;
}

@Injectable({
  providedIn: 'root',
})
export class OneSelectionService {
  private static selected_ingredient: number | null = null;
  private static observers: Observer[] = [];

  constructor() {}

  selected(): number | null {
    return OneSelectionService.selected_ingredient;
  }

  select(item_id: number) {
    OneSelectionService.selected_ingredient = item_id;
    this.notify();
  }

  notify() {
    OneSelectionService.observers.forEach((obs) => {
      obs.update();
    });
  }

  deselect() {
    OneSelectionService.selected_ingredient = null;
    this.notify();
  }

  subscribe(obs: Observer) {
    OneSelectionService.observers.push(obs);
  }

  unsubscribe(obs: Observer) {
    OneSelectionService.observers = OneSelectionService.observers.filter(
      (o) => o != obs,
    );
  }
}
