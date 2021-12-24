import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './autenticacao';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  sair() {
    delete localStorage[LoginComponent.TOKEN_TAG];
    this.router.navigate(['/']);
  }

  autenticado(): boolean {
    return localStorage[LoginComponent.TOKEN_TAG];
  }
}
