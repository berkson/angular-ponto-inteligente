import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento, LancamentoService, Tipo } from 'src/app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css'],
})
export class AtualizacaoComponent implements OnInit {
  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: Tipo[];

  lancamentoId: string;
  localizacao: string;

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
    this.lancamentoId = '';
    this.localizacao = '';
  }

  ngOnInit(): void {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId')!;
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO,
    ];
    this.gerarForm();
    this.obterDadosLancamento();
  }

  obterDadosLancamento() {
    this.lancamentoService.buscarPorId(this.lancamentoId).subscribe({
      next: (data) => {
        const date = data.data.data;
        console.log(date);
        this.form.get('data')?.setValue(date.substring(0, 10)); // verificar bug no form de atualização
        this.form.get('horas')?.setValue(date.substring(11, 13));
        this.form.get('minutos')?.setValue(date.substring(14, 16));
        this.form.get('tipo')?.setValue(data.data.tipo);
        this.localizacao = data.data.localizacao;
      },
      error: (err) => {
        let msg: string = 'Erro obtendo lançamento!';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
        this.router.navigate(['/admin']);
      },
    });
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

  atualizar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.lancamentoService.atualizar(this.obterLancamento(dados)).subscribe({
      next: (data) => {
        const msg: string = 'Lançamento atualizado com sucesso!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        let msg: string = 'Tente novamente em instantes.';
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
      this.localizacao,
      this.funcionarioId,
      this.lancamentoId
    );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }
}
