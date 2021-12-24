import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroPj } from '../models';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CadastroPjService {
  private readonly PATH: string = 'cadastrar-pj';

  constructor(private httpClient: HttpClient) {}

  cadastrar(cadastroPj: CadastroPj): Observable<any> {
    return this.httpClient.post(env.baseApiUrl + this.PATH, cadastroPj);
  }
}
