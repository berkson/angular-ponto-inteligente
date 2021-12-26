import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CnpjValidator, CpfValidator } from 'src/app/shared';
import { CadastroPfService } from '../../services';
import { CadastroPf } from '../../models';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.css'],
})
export class CadastrarPfComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastrarPfService: CadastroPfService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      cnpj: ['', [Validators.required, CnpjValidator]],
    });
  }

  get cpf() {
    return this.form.get('cpf');
  }

  get cnpj() {
    return this.form.get('cnpj');
  }

  cadastrarPf() {
    if (this.form.invalid) return;
    const cadastroPf: CadastroPf = this.form.value;
    this.cadastrarPfService.cadastrar(cadastroPf).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        const msg = 'Realize o login para acessar o sistema.';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        let msg: string = 'Tente novamente em instantes';
        if (err.status == 400) msg = err.error.errors.join(' ');
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
    return false;
  }
}
