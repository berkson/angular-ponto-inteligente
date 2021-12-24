import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import {
  CadastroPfModule,
  CadastroPfRoutingModule,
  CadastroPjModule,
  CadastroPjRoutingModule,
  LoginModule,
  LoginRoutingModule,
} from './autenticacao';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { FuncionarioRoutingModule } from './funcionario';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    LoginRoutingModule,
    CadastroPjModule,
    CadastroPjRoutingModule,
    CadastroPfModule,
    CadastroPfRoutingModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    FuncionarioModule,
    FuncionarioRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
