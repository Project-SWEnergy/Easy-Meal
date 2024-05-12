import { TestBed } from '@angular/core/testing';
import { PrenotazioneDataService } from './prenotazione-data-service.service';

describe('PrenotazioneDataService', () => {
  let service: PrenotazioneDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenotazioneDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get idReservation', () => {
    const id = 123;
    service.setIdReservation(id);
    expect(service.getIdReservation()).toEqual(id);
  });

  it('should set and get idUser', () => {
    const id = 456;
    service.setIdUser(id);
    expect(service.getIdUser()).toEqual(id);
  });

  it('should set and get idRestaurant', () => {
    const id = 789;
    service.setIdRestaurant(id);
    expect(service.getIdRestaurant()).toEqual(id);
  });

  it('should set and get billSplittingMethod', () => {
    const method = 'equal';
    service.setBillSplittingMethod(method);
    expect(service.getBillSplittingMethod()).toEqual(method);
  });

  it('should set and get participants', () => {
    const count = 4;
    service.setParticipants(count);
    expect(service.getParticipants()).toEqual(count);
  });
  
  it('should return null if data is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.loadFromLocalStorage()).toBeNull();
  });

  it('should set idReservation to an empty object if loadFromLocalStorage returns null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.setIdReservation(123);
    expect(service.loadFromLocalStorage()).toEqual(null);
  });

  it('should set setIdUser to an empty object if loadFromLocalStorage returns null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.setIdUser(123);
    expect(service.loadFromLocalStorage()).toEqual(null);
  });
  
  it('should set setIdRestaurant to an empty object if loadFromLocalStorage returns null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.setIdRestaurant(123);
    expect(service.loadFromLocalStorage()).toEqual(null);
  });

  it('should set setBillSplittingMethod to an empty object if loadFromLocalStorage returns null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.setBillSplittingMethod("individuale");
    expect(service.loadFromLocalStorage()).toEqual(null);
  });

  it('should set setParticipants to an empty object if loadFromLocalStorage returns null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.setParticipants(123);
    expect(service.loadFromLocalStorage()).toEqual(null);
  });

  it('should return null if prenotazioneData is null for getIdReservation function ', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getIdReservation()).toBeNull();
  });

  it('should return null if prenotazioneData is null for getIdUser function ', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getIdUser()).toBeNull();
  });

  it('should return null if prenotazioneData is null for getIdRestaurant function ', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getIdRestaurant()).toBeNull();
  });

  it('should return null if prenotazioneData is null for getBillSplittingMethod function ', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getBillSplittingMethod()).toBeNull();
  });

  it('should return null if prenotazioneData is null for getParticipants function ', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getParticipants()).toBeNull();
  });
  
});
