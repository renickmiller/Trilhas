import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITiposPontoVenda, TiposPontoVenda } from '../tipos-ponto-venda.model';
import { TiposPontoVendaService } from '../service/tipos-ponto-venda.service';

import { TiposPontoVendaRoutingResolveService } from './tipos-ponto-venda-routing-resolve.service';

describe('TiposPontoVenda routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TiposPontoVendaRoutingResolveService;
  let service: TiposPontoVendaService;
  let resultTiposPontoVenda: ITiposPontoVenda | undefined;

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
    routingResolveService = TestBed.inject(TiposPontoVendaRoutingResolveService);
    service = TestBed.inject(TiposPontoVendaService);
    resultTiposPontoVenda = undefined;
  });

  describe('resolve', () => {
    it('should return ITiposPontoVenda returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiposPontoVenda = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTiposPontoVenda).toEqual({ id: 123 });
    });

    it('should return new ITiposPontoVenda if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiposPontoVenda = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTiposPontoVenda).toEqual(new TiposPontoVenda());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TiposPontoVenda })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiposPontoVenda = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTiposPontoVenda).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
