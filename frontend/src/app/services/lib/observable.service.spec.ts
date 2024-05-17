import { ObservableService } from './observable.service';

describe('ObservableService', () => {
  let service: ObservableService;
  let mockObserver: any;

  beforeEach(() => {
    service = new ObservableService();
    mockObserver = {
      update: jasmine.createSpy('update'),
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('subscribe', () => {
    it('should add an observer to the list', () => {
      service.subsribe(mockObserver);
      expect(service.obs).toContain(mockObserver);
    });
  });

  describe('unsubscribe', () => {
    it('should remove an observer from the list', () => {
      service.subsribe(mockObserver);
      service.unsubscribe(mockObserver);
      expect(service.obs).not.toContain(mockObserver);
    });
  });

  describe('notify', () => {
    it('should call update on all subscribed observers', () => {
      service.subsribe(mockObserver);
      const anotherMockObserver = {
        update: jasmine.createSpy('update'),
      };
      service.subsribe(anotherMockObserver);

      service.notify();

      expect(mockObserver.update).toHaveBeenCalled();
      expect(anotherMockObserver.update).toHaveBeenCalled();
    });

    it('should not call update on unsubscribed observers', () => {
      const unsubscribedMockObserver = {
        update: jasmine.createSpy('update'),
      };
      service.subsribe(mockObserver);
      service.subsribe(unsubscribedMockObserver);
      service.unsubscribe(unsubscribedMockObserver);

      service.notify();

      expect(mockObserver.update).toHaveBeenCalled();
      expect(unsubscribedMockObserver.update).not.toHaveBeenCalled();
    });
  });
});
