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

  // HttpClient API delete() method => delete serieTV
  deleteSerieTV(id: any) {
    return this.http.delete<SerieTV>(this.apiURL + '/seriesTV/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Crear serieTV
  createSerieTV(serieTV: any): Observable<SerieTV> {
    return this.http.post<SerieTV>(this.apiURL + '/seriesTV', JSON.stringify(serieTV), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API get() method => Consulta una serieTV
  getSerieTV(id: string): Observable<SerieTV> {
    return this.http.get<SerieTV>(this.apiURL + '/seriesTV/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // HttpClient API put() method => Actualiza una serieTV
  updateSerieTV(id: string, serieTV: any): Observable<SerieTV> {
    return this.http.put<SerieTV>(this.apiURL + '/seriesTV/' + id, JSON.stringify(serieTV), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
}