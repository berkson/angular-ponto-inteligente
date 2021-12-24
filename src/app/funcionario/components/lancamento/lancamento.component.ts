import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
  HttpUtilService,
  Lancamento,
  LancamentoService,
  Tipo,
} from 'src/app/shared';

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

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService,
    private httpUtilService: HttpUtilService
  ) {
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
    this.lancamentoService.buscarUltimoTipoLancado().subscribe({
      next: (data) => {
        this.ultimoTipoLancado = data.data ? data.data.tipo : '';
      },
      error: (err) => {
        const msg: string = 'Erro obtendo o último lançamento.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
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
    const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      tipoPonto,
      this.geoLocation,
      this.httpUtilService.obterIdUsuario()
    );
    this.lancamentoService.cadastrar(lancamento).subscribe({
      next: (data) => {
        const msg: string = 'Lançamento realizado com sucesso!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/funcionario/listagem']);
      },
      error: (err) => {
        let msg = 'Tente novamente em instantes';
        if (err.status == 400) msg = err.error.errors.join(' ');
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
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
