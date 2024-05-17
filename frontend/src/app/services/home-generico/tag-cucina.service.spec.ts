import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import { of, throwError } from 'rxjs';
import { TagCucinaService } from './tag-cucina.service';

describe('TagCucinaService', () => {
  let service: TagCucinaService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagCucinaService);
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of tags', (done: DoneFn) => {
    const tags = [
      { id: 1, name: 'Tag1', description: 'Description1' },
      { id: 2, name: 'Tag2', description: 'Description2' },
    ];
    const findTagByRestaurantId = [
      { id_tag: 1, id_restaurant: 1 },
      { id_tag: 2, id_restaurant: 1 },
    ];
    axiosGetSpy.and.returnValues(
      of({ data: { data: findTagByRestaurantId } }),
      of({ data: { data: tags[0] } }),
      of({ data: { data: tags[1] } }),
    );

    service.getTagsByRestaurantId(1).subscribe((result) => {
      expect(result).toEqual(tags);
      done();
    });
  });

  it('should return an error', (done: DoneFn) => {
    axiosGetSpy.and.returnValue(throwError('Error'));

    service.getTagsByRestaurantId(1).subscribe({
      error: (error) => {
        expect(error).toBe('Error');
        done();
      },
    });
  });
});
