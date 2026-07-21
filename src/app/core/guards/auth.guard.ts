//Permite el control para que no se acceda a ninguna ruta sin antes haber iniciado sesion
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // o sessionStorage.getItem('token')
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirige al login
      return false;
    }
  }
}
