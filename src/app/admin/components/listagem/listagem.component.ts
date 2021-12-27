import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Funcionario,
  FuncionarioService,
  HttpUtilService,
  Lancamento,
  LancamentoService,
} from 'src/app/shared';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
})
export class ListagemComponent implements OnInit {
  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  funcionarios: Funcionario[];
  @ViewChild(MatSelect, { static: true }) matSelect!: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;
  constructor(
    private lancamentoService: LancamentoService,
    private httpUtilService: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService
  ) {
    this.dataSource = new MatTableDataSource();
    this.funcionarioId = '';
    this.totalLancamentos = 0;
    this.pagina = 0;
    this.ordem = '';
    this.direcao = '';
    this.funcionarios = [];
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []],
    });
  }

  get funcId(): string {
    return sessionStorage['funcionarioId'] || false;
  }

  obterFuncionarios() {
    this.funcionarioService.listarFuncionarioPorEmpresa().subscribe({
      next: (data) => {
        const usuarioId: string = this.httpUtilService.obterIdUsuario();
        this.funcionarios = (data.data as Funcionario[]).filter(
          (func) => func.id != usuarioId
        );
        if (this.funcId) {
          this.form.get('funcs')?.setValue(parseInt(this.funcId, 10));
          this.exibirLancamentos();
        }
      },
      error: (err) => {
        const msg: string = 'Erro obtendo funcionários.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos() {
    this.funcionarioId = '3';
    this.lancamentoService
      .listarLancamentosPorFuncionario(
        this.funcionarioId,
        this.pagina,
        this.ordem,
        this.direcao
      )
      .subscribe({
        next: (data) => {
          this.totalLancamentos = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[];
          this.dataSource.data = lancamentos;
        },
        error: (err) => {
          const msg = 'Erro obtendo lançamentos!';
          this.snackBar.open(msg, 'Erroa', { duration: 5000 });
        },
      });
  }

  remover(lancId: string) {
    alert(lancId);
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }
}
