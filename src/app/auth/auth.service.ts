import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, catchError } from 'rxjs'

interface AuthResponseData {
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
  constructor(private http: HttpClient){}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3j2a7fAnh3qzb-aIzKSDpKB-Ep7PtKn4",
    {
      email,
      password
    })
    .pipe(
      catchError(error => {
        const ERROR_TARGETS = { 'EMAIL_EXISTS' : 'Email already exists!', 'DEFAULT' : 'An error occured!' };
        const ERROR_TYPE = error.error.error.message ?? 'DEFAULT';
        const ERROR_MESSAGE = ERROR_TARGETS[ERROR_TYPE] ?? ERROR_TARGETS['DEFAULT'];
        console.error(ERROR_MESSAGE);
        return throwError(() => (new Error(ERROR_MESSAGE)).message);
      })
    )
  }
}
