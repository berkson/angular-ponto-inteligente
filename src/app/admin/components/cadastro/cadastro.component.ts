import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import { Lancamento, LancamentoService, Tipo } from 'src/app/shared';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: Tipo[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService
  ) {
    this.form = new FormGroup({});
    this.horas = [];
    this.minutos = [];
    this.tipos = [];
  }

  ngOnInit(): void {
    this.gerarForm();
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO,
    ];
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
    });
  }

  gerarListaNumeros(first: number, last: number) {
    let total = last - first + 1;
    let numbers: string[] = [];
    Object.keys(new Array(total).fill(null)).map((value) => {
      if (parseInt(value) < 10) numbers.push('0' + value);
      else numbers.push(value);
    });
    return numbers;
  }

  cadastrar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    console.log(JSON.stringify(dados));
    this.lancamentoService.cadastrar(this.obterLancamento(dados)).subscribe({
      next: (data) => {
        const msg: string = 'Lançamento cadastrado com sucesso!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        let msg: string = 'Tente novamente em instantes!';
        if (err.status == 400) {
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  obterLancamento(dados: any): Lancamento {
    const data = moment(dados.data);
    data.set({
      hour: dados.horas,
      minute: dados.minutos,
      second: 0,
    });
    return new Lancamento(
      data.format('YYYY-MM-DD HH:mm:ss'),
      dados.tipo,
      '',
      this.funcionarioId
    );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }
}
