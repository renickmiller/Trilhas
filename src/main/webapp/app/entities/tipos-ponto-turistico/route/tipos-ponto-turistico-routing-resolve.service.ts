import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITiposPontoTuristico, TiposPontoTuristico } from '../tipos-ponto-turistico.model';
import { TiposPontoTuristicoService } from '../service/tipos-ponto-turistico.service';

@Injectable({ providedIn: 'root' })
export class TiposPontoTuristicoRoutingResolveService implements Resolve<ITiposPontoTuristico> {
  constructor(protected service: TiposPontoTuristicoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITiposPontoTuristico> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tiposPontoTuristico: HttpResponse<TiposPontoTuristico>) => {
          if (tiposPontoTuristico.body) {
            return of(tiposPontoTuristico.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TiposPontoTuristico());
  }
}
