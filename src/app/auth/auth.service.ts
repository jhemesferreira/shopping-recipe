import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, catchError, Observable, Subject, tap } from 'rxjs'
import { User } from "./user.module";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient){}

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3j2a7fAnh3qzb-aIzKSDpKB-Ep7PtKn4',
    {
      email,
      password
    })
    .pipe(
      tap(this.handleAuthentication.bind(this)),
      catchError(this.handleError),
    )
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3j2a7fAnh3qzb-aIzKSDpKB-Ep7PtKn4',
    {
      email,
      password
    }).pipe(
      tap(this.handleAuthentication.bind(this)),
      catchError(this.handleError)
    )
  }

  private handleAuthentication(response: AuthResponseData){
    const expirationDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );

    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );

    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    const ERROR_TARGETS = {
      'EMAIL_EXISTS' : 'Email already exists!',
      'DEFAULT' : 'An error occured!',
      'EMAIL_NOT_FOUND' : 'There is no user record corresponding to this identifier!',
      'INVALID_PASSWORD' : 'The password is invalid or the user does not have a password!',
    };

    const ERROR_TYPE = errorRes.error.error.message ?? 'DEFAULT';
    const ERROR_MESSAGE = ERROR_TARGETS[ERROR_TYPE] ?? ERROR_TARGETS['DEFAULT'];
    console.error(ERROR_MESSAGE);
    return throwError(() => (new Error(ERROR_MESSAGE)).message)
  }
}
