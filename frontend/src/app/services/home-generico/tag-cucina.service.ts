import axios from '../../../../axios-config';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { throwError } from 'rxjs';
import {
  ResultFindTagByRestaurantId,
  FindTagByRestaurantId,
  ResultTag,
  Tag,
} from '../../interfaces/tag'; // Import delle interfacce necessarie

@Injectable({
  providedIn: 'root',
})
export class TagCucinaService {
  constructor() {}
  protected tag: Tag[];

  getTagsByRestaurantId(restaurantId: number): Observable<Tag[]> {
    return from(
      axios.get<ResultFindTagByRestaurantId<FindTagByRestaurantId[]>>(
        `restaurants-tags/find-all-by-restaurant/${restaurantId}`,
      ),
    ).pipe(
      map((response: any) => response.data.data),
      mergeMap((tags: FindTagByRestaurantId[]) => {
        const observables: Observable<Tag>[] = [];
        for (const tag of tags) {
          observables.push(
            from(axios.get<ResultTag<Tag>>(`tags/find-one/${tag.id_tag}`)).pipe(
              map((response: any) => response.data.data as Tag),
            ),
          );
        }
        return forkJoin(observables).pipe(map((tags: any) => tags.flat()));
      }),
      catchError((error) => {
        console.error('Error during API call:', error);
        return throwError(error);
      }),
    );
  }
}
