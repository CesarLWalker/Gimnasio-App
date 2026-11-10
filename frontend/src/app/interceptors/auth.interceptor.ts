import { AuthService } from 'src/app/services/auth.service';
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

   // No agregar token al login
  if (req.url.includes('/api/auth/login')) {
    return next(req);
  }

  const token = authService.getToken();

  // Si no hay token, continúa normalmente
  if (!token) {
    return next(req);
  }

  // Agrega automáticamente el Bearer Token
  const requestConToken = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  });

  return next(requestConToken);
};
