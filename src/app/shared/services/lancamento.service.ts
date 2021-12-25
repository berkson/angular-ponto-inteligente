import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtilService } from './http-util.service';
import { environment as env } from 'src/environments/environment';
import { Lancamento } from '..';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private readonly PATH_ID = '/funcionario/{funcionarioId}';
  private readonly PATH: string = 'lancamentos';
  private readonly PATH_LAST_LANC = this.PATH_ID + '/ultimo';
  private readonly PATH_LANCS = this.PATH_ID;
  private readonly PATH_ALL_LANCS = this.PATH_ID + '/todos';
  constructor(
    private httpClient: HttpClient,
    private httpUtilService: HttpUtilService
  ) {}

  replaceFuncId(path: string): string {
    return path.replace(
      '{funcionarioId}',
      this.httpUtilService.obterIdUsuario()
    );
  }

  buscarUltimoTipoLancado(): Observable<any> {
    return this.httpClient.get(
      env.baseApiUrl + this.PATH + this.replaceFuncId(this.PATH_LAST_LANC),
      this.httpUtilService.headers()
    );
  }

  cadastrar(lancamento: Lancamento): Observable<any> {
    return this.httpClient.post(
      env.baseApiUrl + this.PATH,
      lancamento,
      this.httpUtilService.headers()
    );
  }

  listarTodosLancamentos(): Observable<any> {
    return this.httpClient.get(
      env.baseApiUrl + this.PATH + this.replaceFuncId(this.PATH_ALL_LANCS),
      this.httpUtilService.headers()
    );
  }
}
