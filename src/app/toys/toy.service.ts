import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Toy } from './toy';

@Injectable({
  providedIn: 'root'
})
export class ToyService {
  private toysUrl = 'api/toys';

  constructor(private http: HttpClient) { }

  getToys(): Observable<Toy[]> {
    return this.http.get<Toy[]>(this.toysUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getToy(id: number): Observable<Toy> {
    if (id === 0) {
      return of(this.initializeToy());
    }
    const url = `${this.toysUrl}/${id}`;
    return this.http.get<Toy>(url)
      .pipe(
        tap(data => console.log('getToy: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createToy(toy: Toy): Observable<Toy> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    toy.id = null;
    return this.http.post<Toy>(this.toysUrl, toy, { headers })
      .pipe(
        tap(data => console.log('createToy: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteToy(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.toysUrl}/${id}`;
    return this.http.delete<Toy>(url, { headers })
      .pipe(
        tap(data => console.log('deleteToy: ' + id)),
        catchError(this.handleError)
      );
  }

  updateToy(toy: Toy): Observable<Toy> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.toysUrl}/${toy.id}`;
    return this.http.put<Toy>(url, toy, { headers })
      .pipe(
        tap(() => console.log('updateToy: ' + toy.id)),
        // Return the toy on an update
        map(() => toy),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeToy(): Toy {
    // Return an initialized object
    return {
      id: 0,
      toyName: null,
      toyCode: null,
      category: null,
      tags: [],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }
}
