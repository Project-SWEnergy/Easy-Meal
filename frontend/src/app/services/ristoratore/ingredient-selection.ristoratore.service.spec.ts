import { TestBed } from '@angular/core/testing';
import {
  OneSelectionService,
  Observer,
} from './ingredient-selection.ristoratore.service';

describe('OneSelectionService', () => {
  let service: OneSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('select and notify functionality', () => {
    it('should select an item and notify observers', () => {
      const observer1: Observer = { update: jasmine.createSpy('update') };
      const observer2: Observer = { update: jasmine.createSpy('update') };
      service.subscribe(observer1);
      service.subscribe(observer2);

      service.select(1);

      expect(service.selected()).toEqual(1);
      expect(observer1.update).toHaveBeenCalled();
      expect(observer2.update).toHaveBeenCalled();
    });

    it('should deselect an item and notify observers', () => {
      const observer: Observer = { update: jasmine.createSpy('update') };
      service.subscribe(observer);

      service.select(1); // Select an item first
      service.deselect(); // Then deselect

      expect(service.selected()).toBeNull();
      expect(observer.update).toHaveBeenCalledTimes(2);
    });
  });

  describe('observer management', () => {
    it('should add and remove observers correctly', () => {
      const observer: Observer = { update: jasmine.createSpy('update') };

      service.subscribe(observer);
      expect(OneSelectionService['observers']).toContain(observer);

      service.unsubscribe(observer);
      expect(OneSelectionService['observers']).not.toContain(observer);
    });
  });
});
