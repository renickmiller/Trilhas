import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITiposPontoVenda, getTiposPontoVendaIdentifier } from '../tipos-ponto-venda.model';

export type EntityResponseType = HttpResponse<ITiposPontoVenda>;
export type EntityArrayResponseType = HttpResponse<ITiposPontoVenda[]>;

@Injectable({ providedIn: 'root' })
export class TiposPontoVendaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipos-ponto-vendas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tiposPontoVenda: ITiposPontoVenda): Observable<EntityResponseType> {
    return this.http.post<ITiposPontoVenda>(this.resourceUrl, tiposPontoVenda, { observe: 'response' });
  }

  update(tiposPontoVenda: ITiposPontoVenda): Observable<EntityResponseType> {
    return this.http.put<ITiposPontoVenda>(
      `${this.resourceUrl}/${getTiposPontoVendaIdentifier(tiposPontoVenda) as number}`,
      tiposPontoVenda,
      { observe: 'response' }
    );
  }

  partialUpdate(tiposPontoVenda: ITiposPontoVenda): Observable<EntityResponseType> {
    return this.http.patch<ITiposPontoVenda>(
      `${this.resourceUrl}/${getTiposPontoVendaIdentifier(tiposPontoVenda) as number}`,
      tiposPontoVenda,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITiposPontoVenda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITiposPontoVenda[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTiposPontoVendaToCollectionIfMissing(
    tiposPontoVendaCollection: ITiposPontoVenda[],
    ...tiposPontoVendasToCheck: (ITiposPontoVenda | null | undefined)[]
  ): ITiposPontoVenda[] {
    const tiposPontoVendas: ITiposPontoVenda[] = tiposPontoVendasToCheck.filter(isPresent);
    if (tiposPontoVendas.length > 0) {
      const tiposPontoVendaCollectionIdentifiers = tiposPontoVendaCollection.map(
        tiposPontoVendaItem => getTiposPontoVendaIdentifier(tiposPontoVendaItem)!
      );
      const tiposPontoVendasToAdd = tiposPontoVendas.filter(tiposPontoVendaItem => {
        const tiposPontoVendaIdentifier = getTiposPontoVendaIdentifier(tiposPontoVendaItem);
        if (tiposPontoVendaIdentifier == null || tiposPontoVendaCollectionIdentifiers.includes(tiposPontoVendaIdentifier)) {
          return false;
        }
        tiposPontoVendaCollectionIdentifiers.push(tiposPontoVendaIdentifier);
        return true;
      });
      return [...tiposPontoVendasToAdd, ...tiposPontoVendaCollection];
    }
    return tiposPontoVendaCollection;
  }
}
