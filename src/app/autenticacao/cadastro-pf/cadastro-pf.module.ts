import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarPfComponent } from './components/cadastrar-pf/cadastrar-pf.component';
import { CadastroPfComponent } from './components/cadastro-pf.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CadastrarPfComponent, CadastroPfComponent],
  imports: [CommonModule, RouterModule],
})
export class CadastroPfModule {}
