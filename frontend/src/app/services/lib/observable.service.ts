import { Injectable } from '@angular/core';

interface Observer {
  update(): void;
}

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  obs: Observer[] = [];

  constructor() {}

  subsribe(o: Observer) {
    this.obs.push(o);
  }

  unsubscribe(o: Observer) {
    this.obs = this.obs.filter((o2) => o2 !== o);
  }

  notify() {
    this.obs.forEach((o) => o.update());
  }
}
