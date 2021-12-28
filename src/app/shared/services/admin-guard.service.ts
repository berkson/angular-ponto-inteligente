import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpUtilService } from '.';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(
    private httpUtilService: HttpUtilService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.httpUtilService.obterPerfil() === 'ROLE_ADMIN') return true;
    const msg = 'Acesse o sistema como Administrador';
    this.snackBar.open(msg, 'Blocked', { duration: 5000 });
    this.router.navigate(['/funcionario']);
    return false;
  }
}
