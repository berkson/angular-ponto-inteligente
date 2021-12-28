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

  replaceFuncId(path: string, funcionarioId?: string): string {
    if (funcionarioId === undefined) {
      return path.replace(
        '{funcionarioId}',
        this.httpUtilService.obterIdUsuario()
      );
    }
    return path.replace('{funcionarioId}', funcionarioId);
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

  listarLancamentosPorFuncionario(
    funcionarioId: string,
    pagina: number,
    ordem: string,
    direcao: string
  ): Observable<any> {
    const url: string =
      env.baseApiUrl +
      this.PATH +
      this.replaceFuncId(this.PATH_LANCS, funcionarioId);
    const params: string =
      '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;
    return this.httpClient.get(url + params, this.httpUtilService.headers());
  }

  remover(lancamentoId: string): Observable<any> {
    return this.httpClient.delete(
      env.baseApiUrl + this.PATH + '/' + lancamentoId,
      this.httpUtilService.headers()
    );
  }

  buscarPorId(lancamentoId: string): Observable<any> {
    return this.httpClient.get(
      env.baseApiUrl + this.PATH + '/' + lancamentoId,
      this.httpUtilService.headers()
    );
  }

  atualizar(lancamento: Lancamento): Observable<any> {
    return this.httpClient.put(
      env.baseApiUrl + this.PATH + '/' + lancamento.id,
      lancamento,
      this.httpUtilService.headers()
    );
  }
}
