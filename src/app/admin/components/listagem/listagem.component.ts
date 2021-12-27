import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpUtilService, Lancamento, LancamentoService } from 'src/app/shared';

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

  private pagina: number;
  private ordem: string;
  private direcao: string;
  constructor(
    private lancamentoService: LancamentoService,
    private httpUtilService: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource();
    this.funcionarioId = '';
    this.totalLancamentos = 0;
    this.pagina = 0;
    this.ordem = '';
    this.direcao = '';
  }

  ngOnInit(): void {
    this.ordemPadrao();
    this.exibirLancamentos();
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos() {
    this.funcionarioId = '2';
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
