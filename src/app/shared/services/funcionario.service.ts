import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtilService } from './';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly PATH: string = 'funcionarios';
  private readonly PATH_FUNC_POR_EMPRESA: string = '/empresa/{empresaId}';

  constructor(
    private httpClient: HttpClient,
    private httpUtilService: HttpUtilService
  ) {}

  listarFuncionarioPorEmpresa(): Observable<any> {
    return this.httpClient.get(
      env.baseApiUrl +
        this.PATH +
        this.PATH_FUNC_POR_EMPRESA.replace(
          '{empresaId}',
          this.httpUtilService.obterIdEmpresa()
        ),
      this.httpUtilService.headers()
    );
  }
}
