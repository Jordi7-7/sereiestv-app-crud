import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { SerieTV } from '../model/serie-tv';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Definir API
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  //Http options:
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // Manejo de errores 
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  //Metodos CRUD para consumir el API RESTful
  getSeriesTV(): Observable<SerieTV> {
    return this.http.get<SerieTV>(this.apiURL + '/seriesTV')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
}