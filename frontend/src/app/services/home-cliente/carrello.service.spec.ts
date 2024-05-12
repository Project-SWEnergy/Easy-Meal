import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import MockAdapter from 'axios-mock-adapter';
import { CarrelloService } from './carrello.service';

describe('CarrelloService', () => {
  let service: CarrelloService;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrelloService);
    mockAxios = new MockAdapter(axios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    const initialCartLength = service.getCarrello().length;
    service.addToCart(1, 'Pizza', 'pizza.jpg', 10);
    expect(service.getCarrello().length).toBe(initialCartLength + 1);
  });

  it('should remove item from cart', () => {
    service.addToCart(1, 'Pizza', 'pizza.jpg', 10);
    const initialCartLength = service.getCarrello().length;
    service.removeFromCart(1);
    expect(service.getCarrello().length).toBe(initialCartLength - 1);
  });

  /*
  it('should remove ingredient from cart item', () => {
    service.addToCart(1, 'Pizza', 'pizza.jpg', 10);
    service.removeIngredientFromCart(1, 1, 'Pepperoni');
    const cartItem = service.getCarrello()[0];
    expect(cartItem.removed_ingredients.length).toBe(1);
    expect(cartItem.removedIngredientNames.length).toBe(1);
    expect(cartItem.removedIngredientNames[0]).toBe('Pepperoni');
  });
  */

  it('should send order', async () => {
    const mockCart = [{ id_dish: 1, removed_ingredients: [1] }];
    const mockResponse = { data: 'Order sent successfully' };

    mockAxios.onPost('ordered-dishes/create').reply(200, mockResponse);

    const response = await service.inviaOrdine(mockCart);
    expect(response.data).toEqual(mockResponse);
  });

  it('should cancel order', async () => {
    const mockReservationId = 123;
    const mockResponse = { data: 'Order canceled successfully' };

    mockAxios.onPost('ordered-dishes/create').reply(200, mockResponse);

    const response = await service.cancellaOrdine(mockReservationId);
    expect(response.data).toEqual(mockResponse);
  });
});
