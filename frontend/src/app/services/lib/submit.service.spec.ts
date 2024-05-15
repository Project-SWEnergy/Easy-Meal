import { TestBed } from '@angular/core/testing';
import { SubmitService } from './submit.service';
import axios from '../../../../axios-config';
import MockAdapter from 'axios-mock-adapter';
import { MessageService } from './message.service';

describe('SubmitService', () => {
  let service: SubmitService<any, any>;
  let mockAxios: MockAdapter;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmitService, MessageService],
    });
    service = TestBed.inject(SubmitService);
    messageService = TestBed.inject(MessageService);
    mockAxios = new MockAdapter(axios);
    spyOn(messageService, 'error');
  });

  it('should set api_url correctly', () => {
    const apiUrl = 'test/api/url';
    service.api(apiUrl);
    expect(service['api_url']).toEqual(apiUrl);
  });

  it('should set field_to_access correctly', () => {
    const fieldToAccess = 'testField';
    service.field(fieldToAccess);
    expect(service['field_to_access']).toEqual(fieldToAccess);
  });

  it('should perform post request and return data on success', async () => {
    const apiUrl = 'test/api/url';
    const responseData = { result: true, testField: 'testValue' };
    mockAxios.onPost(apiUrl).reply(200, responseData);

    service.api(apiUrl).field('testField');
    const result = await service.post({});

    expect(result).toEqual('testValue');
  });

  it('should handle post request failure', async () => {
    const apiUrl = 'test/api/url';
    const errorMessage = new Error('Network Error');
    mockAxios.onPost(apiUrl).networkError();

    service.api(apiUrl);

    try {
      await service.post({});
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });
});
