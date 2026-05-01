import { HttpErrorResponse } from '@angular/common/http';
import type { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { ApiError } from '../../errors/api-error';

function mapHttpErrorToMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Falha de conexao. Verifique sua internet e tente novamente.';
  }

  if (error.status === 404) {
    return 'Recurso nao encontrado. Tente novamente mais tarde.';
  }

  if (error.status >= 500) {
    return 'Erro interno no servidor. Tente novamente em instantes.';
  }

  return 'Nao foi possivel concluir a requisicao. Tente novamente.';
}

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const apiError = new ApiError(mapHttpErrorToMessage(error), error.status, error.url, error);
        return throwError(() => apiError);
      }

      return throwError(() => error);
    }),
  );
