import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ToyResolved } from './toy';
import { ToyService } from './toy.service';

@Injectable({
  providedIn: 'root'
})
export class ToyResolver implements Resolve<ToyResolved> {

  constructor(private toyService: ToyService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ToyResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Toy id was not a number: ${id}`;
      console.error(message);
      return of({ toy: null, error: message });
    }

    return this.toyService.getToy(+id)
      .pipe(
        map(toy => ({ toy: toy })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ toy: null, error: message });
        })
      );
  }

}
