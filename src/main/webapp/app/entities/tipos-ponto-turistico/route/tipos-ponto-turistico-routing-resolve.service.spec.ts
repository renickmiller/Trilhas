import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITiposPontoTuristico, TiposPontoTuristico } from '../tipos-ponto-turistico.model';
import { TiposPontoTuristicoService } from '../service/tipos-ponto-turistico.service';

import { TiposPontoTuristicoRoutingResolveService } from './tipos-ponto-turistico-routing-resolve.service';

describe('TiposPontoTuristico routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TiposPontoTuristicoRoutingResolveService;
  let service: TiposPontoTuristicoService;
  let resultTiposPontoTuristico: ITiposPontoTuristico | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(TiposPontoTuristicoRoutingResolveService);
    service = TestBed.inject(TiposPontoTuristicoService);
    resultTiposPontoTuristico = undefined;
  });

  describe('resolve', () => {
    it('should return ITiposPontoTuristico returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiposPontoTuristico = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTiposPontoTuristico).toEqual({ id: 123 });
    });

    it('should return new ITiposPontoTuristico if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiposPontoTuristico = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTiposPontoTuristico).toEqual(new TiposPontoTuristico());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TiposPontoTuristico })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiposPontoTuristico = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTiposPontoTuristico).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
