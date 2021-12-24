import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../..';
import { Login } from '../../components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public static readonly TOKEN_TAG: string = 'token';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logar() {
    if (this.form.invalid) {
      return;
    }
    const login: Login = this.form.value;
    this.loginService.logar(login).subscribe({
      next: (data) => {
        let tokenData = data['data'][LoginComponent.TOKEN_TAG];
        //console.log(JSON.stringify(data));
        localStorage[LoginComponent.TOKEN_TAG] = tokenData;
        //atob() decodificador de base64
        const usuarioData = JSON.parse(atob(tokenData.split('.')[1]));
        //console.log(JSON.stringify(usuarioData));
        if (usuarioData['role'] === 'ROLE_ADMIN') alert('to admin page');
        //this.router.navigate(['/admin']);
        else alert('to func page'); //this.router.navigate(['/funcionario']);
      },
      error: (err) => {
        // console.log(JSON.stringify(err));
        let msg: string = 'Tente Novamente em instantes';
        if (err['status'] == 401) {
          msg = 'Email/Senha inválido(s).';
        }
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
