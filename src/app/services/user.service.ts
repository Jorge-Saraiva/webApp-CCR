
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { User } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'users'
    this.baseUrl = this.myAppUrl + this.myApiUrl;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  deleteUser(id?: number | undefined): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/" + id)
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(this.baseUrl, user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/" + id)
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(this.baseUrl + "/" + id, user)
  }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY
  }
}
