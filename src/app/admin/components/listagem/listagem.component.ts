import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect, MatSelectChange } from '@angular/material/select';
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
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog
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

  exibirLancamentos(event?: MatSelectChange) {
    if (this.matSelect.selected && event?.value !== undefined) {
      this.funcionarioId = event.value; // verificar o resto da aplicaçãoverificar o resto da aplicação
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }
    sessionStorage['funcionarioId'] = this.funcionarioId;
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
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
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

  removerDialog(lancamentoId: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe((remover) => {
      if (remover) this.remover(lancamentoId);
    });
  }

  remover(lancamentoId: string) {
    this.lancamentoService.remover(lancamentoId).subscribe({
      next: (data) => {
        const msg: string = 'Lançamento excluído com sucesso!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.exibirLancamentos();
      },
      error: (err) => {
        let msg: string = 'Tente novamente em instantes';
        if (err.status == 400) {
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}

@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente remover o lançamento?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `,
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
