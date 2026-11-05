import { AuthService } from 'src/app/services/auth.service';
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(request);
  }

  return next(req);
}