import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Tipo } from 'src/app/shared';

declare var navigator: any; // objeto do próprio navegador para recuperar a localização

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
})
export class LancamentoComponent implements OnInit {
  private _dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(private snackBar: MatSnackBar, private routerr: Router) {
    this._dataAtualEn = '';
    this.dataAtual = '';
    this.geoLocation = '';
    this.ultimoTipoLancado = '';
  }

  ngOnInit(): void {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.obterUltimoLancamento();
  }

  public get dataAtualEn(): string {
    return this._dataAtualEn;
  }
  public set dataAtualEn(value: string) {
    this._dataAtualEn = value;
  }

  obterUltimoLancamento() {
    this.ultimoTipoLancado = '';
  }
  obterGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: { coords: { latitude: any; longitude: any } }) => {
          this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`;
        }
      );
    }
    return '';
  }

  obterMapUrl(): string {
    return (
      'https://www.google.com/maps/search/?api=1&query=' + this.geoLocation
    );
  }

  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  cadastrar(tipoPonto: Tipo) {
    alert(`Tipo: ${tipoPonto}, DataAtualEn: ${this.dataAtualEn},
    geoLocation: ${this.geoLocation}`);
  }

  exibirInicioTrabalho(): boolean {
    return (
      this.ultimoTipoLancado == '' ||
      this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO
    );
  }

  exibirTerminoTrabalho(): boolean {
    return (
      this.ultimoTipoLancado == Tipo.INICIO_TRABALHO ||
      this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO
    );
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO;
  }
}
