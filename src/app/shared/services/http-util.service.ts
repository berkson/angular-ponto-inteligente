import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginComponent } from 'src/app/autenticacao';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  constructor() {}

  headers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    if (localStorage[LoginComponent.TOKEN_TAG]) {
      httpHeaders = httpHeaders.set(
        'authorization',
        `bearer ${localStorage[LoginComponent.TOKEN_TAG]}`
      );
    }
    return { headers: httpHeaders };
  }

  obterIdUsuario(): string {
    if (!localStorage[LoginComponent.TOKEN_TAG]) return '';
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.id : '';
  }

  obterIdEmpresa(): string {
    if (!localStorage[LoginComponent.TOKEN_TAG]) return '';
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.empresaId : '';
  }

  obterDadosUsuario() {
    if (!localStorage[LoginComponent.TOKEN_TAG]) return '';
    return JSON.parse(
      atob(localStorage[LoginComponent.TOKEN_TAG].split('.')[1])
    );
  }
}
