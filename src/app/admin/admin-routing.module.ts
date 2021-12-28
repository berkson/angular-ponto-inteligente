import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../shared';
import {
  AdminComponent,
  AtualizacaoComponent,
  CadastroComponent,
  ListagemComponent,
} from './components';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: '',
        component: ListagemComponent,
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'atualizacao/:lancamentoId',
        component: AtualizacaoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
