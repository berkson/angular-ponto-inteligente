import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../components';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly PATH: string = 'auth';
  constructor(private httpClient: HttpClient) {}

  logar(login: Login): Observable<any> {
    return this.httpClient.post(env.baseUrl + this.PATH, login);
  }
}
