import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import {
  FuncionarioComponent,
  LancamentoComponent,
  ListagemComponent,
} from './components';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpUtilService, LancamentoService } from '../shared';
import { DataBrPipe } from '../shared/pipes';

@NgModule({
  declarations: [
    ListagemComponent,
    LancamentoComponent,
    FuncionarioComponent,
    DataBrPipe,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
  ],
  providers: [LancamentoService, HttpUtilService],
})
export class FuncionarioModule {}
