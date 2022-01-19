import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITiposPontoTuristico, getTiposPontoTuristicoIdentifier } from '../tipos-ponto-turistico.model';

export type EntityResponseType = HttpResponse<ITiposPontoTuristico>;
export type EntityArrayResponseType = HttpResponse<ITiposPontoTuristico[]>;

@Injectable({ providedIn: 'root' })
export class TiposPontoTuristicoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipos-ponto-turisticos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tiposPontoTuristico: ITiposPontoTuristico): Observable<EntityResponseType> {
    return this.http.post<ITiposPontoTuristico>(this.resourceUrl, tiposPontoTuristico, { observe: 'response' });
  }

  update(tiposPontoTuristico: ITiposPontoTuristico): Observable<EntityResponseType> {
    return this.http.put<ITiposPontoTuristico>(
      `${this.resourceUrl}/${getTiposPontoTuristicoIdentifier(tiposPontoTuristico) as number}`,
      tiposPontoTuristico,
      { observe: 'response' }
    );
  }

  partialUpdate(tiposPontoTuristico: ITiposPontoTuristico): Observable<EntityResponseType> {
    return this.http.patch<ITiposPontoTuristico>(
      `${this.resourceUrl}/${getTiposPontoTuristicoIdentifier(tiposPontoTuristico) as number}`,
      tiposPontoTuristico,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITiposPontoTuristico>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITiposPontoTuristico[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTiposPontoTuristicoToCollectionIfMissing(
    tiposPontoTuristicoCollection: ITiposPontoTuristico[],
    ...tiposPontoTuristicosToCheck: (ITiposPontoTuristico | null | undefined)[]
  ): ITiposPontoTuristico[] {
    const tiposPontoTuristicos: ITiposPontoTuristico[] = tiposPontoTuristicosToCheck.filter(isPresent);
    if (tiposPontoTuristicos.length > 0) {
      const tiposPontoTuristicoCollectionIdentifiers = tiposPontoTuristicoCollection.map(
        tiposPontoTuristicoItem => getTiposPontoTuristicoIdentifier(tiposPontoTuristicoItem)!
      );
      const tiposPontoTuristicosToAdd = tiposPontoTuristicos.filter(tiposPontoTuristicoItem => {
        const tiposPontoTuristicoIdentifier = getTiposPontoTuristicoIdentifier(tiposPontoTuristicoItem);
        if (tiposPontoTuristicoIdentifier == null || tiposPontoTuristicoCollectionIdentifiers.includes(tiposPontoTuristicoIdentifier)) {
          return false;
        }
        tiposPontoTuristicoCollectionIdentifiers.push(tiposPontoTuristicoIdentifier);
        return true;
      });
      return [...tiposPontoTuristicosToAdd, ...tiposPontoTuristicoCollection];
    }
    return tiposPontoTuristicoCollection;
  }
}
