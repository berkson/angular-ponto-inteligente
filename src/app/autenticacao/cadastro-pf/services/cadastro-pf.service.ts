import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { CadastroPf } from '..';

@Injectable({
  providedIn: 'root',
})
export class CadastroPfService {
  private readonly PATH: string = 'cadastrar-pf';
  constructor(private httpClient: HttpClient) {}

  cadastrar(cadastroPf: CadastroPf): Observable<any> {
    return this.httpClient.post(env.baseApiUrl + this.PATH, cadastroPf);
  }
}
