import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FuncionarioComponent,
  LancamentoComponent,
  ListagemComponent,
} from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListagemComponent, LancamentoComponent, FuncionarioComponent],
  imports: [CommonModule, FlexLayoutModule, RouterModule],
})
export class FuncionarioModule {}
