import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Place } from '../interfaces/places';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private myAppUrl: string;
  private myApiUrl: string;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'places'
    this.baseUrl = this.myAppUrl + this.myApiUrl;
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.baseUrl)
  }

  deletePlace(id?: number | undefined): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/" + id)
  }

  addPlace(place: Place): Observable<void> {
    return this.http.post<void>(this.baseUrl, place).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(this.baseUrl + "/" + id)
  }

  updatePlace(id: number, Place: Place): Observable<void> {
    return this.http.put<void>(this.baseUrl + "/" + id, Place)
  }

  showMessage(msg: string, isError: boolean = false): void{
    this._snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] :  ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY
  }
}
