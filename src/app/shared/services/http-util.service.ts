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
        'Authorization',
        `Bearer ${localStorage[LoginComponent.TOKEN_TAG]}`
      );
    }
    return { headers: httpHeaders };
  }

  isUserLogged(): boolean {
    return localStorage[LoginComponent.TOKEN_TAG];
  }

  obterIdUsuario(): string {
    if (!this.isUserLogged()) return '';
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.id : '';
  }

  obterIdEmpresa(): string {
    if (!this.isUserLogged()) return '';
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.empresaId : '';
  }

  obterDadosUsuario() {
    if (!this.isUserLogged()) return '';
    return JSON.parse(
      atob(localStorage[LoginComponent.TOKEN_TAG].split('.')[1])
    );
  }

  obterPerfil(): string {
    if (!this.isUserLogged()) return '';
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.role : '';
  }
}
