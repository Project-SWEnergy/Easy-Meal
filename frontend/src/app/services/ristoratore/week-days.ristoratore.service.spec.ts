import { TestBed } from '@angular/core/testing';
import { WeekDaysRistoratoreService } from './week-days.ristoratore.service';
import axios from '../../../../axios-config';
import { MessageService } from '../lib/message.service';
import MockAdapter from 'axios-mock-adapter';

describe('WeekDaysRistoratoreService', () => {
  let service: WeekDaysRistoratoreService;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    // Mock MessageService
    mockMessageService = jasmine.createSpyObj('MessageService', ['error']);

    // Provide both the service to test and the mocked MessageService
    TestBed.configureTestingModule({
      providers: [
        WeekDaysRistoratoreService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
    service = TestBed.inject(WeekDaysRistoratoreService);

    // Mock axios
    mockAxios = new MockAdapter(axios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and sort weekdays correctly', async () => {
    mockAxios.onGet('days-of-the-week/find-all').reply(200, {
      result: true,
      data: [
        { name: 'Monday', order: 1 },
        { name: 'Wednesday', order: 2 },
        { name: 'Sunday', order: 3 },
      ],
    });

    const weekdays = await service.get();

    expect(weekdays[0].name).toEqual('Monday');
    expect(weekdays[1].name).toEqual('Wednesday');
    expect(weekdays[2].name).toEqual('Sunday');
  });

  it('should handle errors correctly and log them', async () => {
    mockAxios.onGet('days-of-the-week/find-all').reply(200, { result: false });
    const result = await service.get();

    expect(mockMessageService.error).toHaveBeenCalledWith('Errore nel recupero dei giorni della settimana');
    expect(result).toEqual([]);
  });
});
