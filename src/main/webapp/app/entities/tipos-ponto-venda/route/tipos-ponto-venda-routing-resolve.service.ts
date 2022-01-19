import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITiposPontoVenda, TiposPontoVenda } from '../tipos-ponto-venda.model';
import { TiposPontoVendaService } from '../service/tipos-ponto-venda.service';

@Injectable({ providedIn: 'root' })
export class TiposPontoVendaRoutingResolveService implements Resolve<ITiposPontoVenda> {
  constructor(protected service: TiposPontoVendaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITiposPontoVenda> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tiposPontoVenda: HttpResponse<TiposPontoVenda>) => {
          if (tiposPontoVenda.body) {
            return of(tiposPontoVenda.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TiposPontoVenda());
  }
}
