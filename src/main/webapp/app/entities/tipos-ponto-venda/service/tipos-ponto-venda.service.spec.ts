import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITiposPontoVenda, TiposPontoVenda } from '../tipos-ponto-venda.model';

import { TiposPontoVendaService } from './tipos-ponto-venda.service';

describe('TiposPontoVenda Service', () => {
  let service: TiposPontoVendaService;
  let httpMock: HttpTestingController;
  let elemDefault: ITiposPontoVenda;
  let expectedResult: ITiposPontoVenda | ITiposPontoVenda[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TiposPontoVendaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      descricao: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a TiposPontoVenda', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TiposPontoVenda()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TiposPontoVenda', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TiposPontoVenda', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new TiposPontoVenda()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TiposPontoVenda', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a TiposPontoVenda', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTiposPontoVendaToCollectionIfMissing', () => {
      it('should add a TiposPontoVenda to an empty array', () => {
        const tiposPontoVenda: ITiposPontoVenda = { id: 123 };
        expectedResult = service.addTiposPontoVendaToCollectionIfMissing([], tiposPontoVenda);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tiposPontoVenda);
      });

      it('should not add a TiposPontoVenda to an array that contains it', () => {
        const tiposPontoVenda: ITiposPontoVenda = { id: 123 };
        const tiposPontoVendaCollection: ITiposPontoVenda[] = [
          {
            ...tiposPontoVenda,
          },
          { id: 456 },
        ];
        expectedResult = service.addTiposPontoVendaToCollectionIfMissing(tiposPontoVendaCollection, tiposPontoVenda);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TiposPontoVenda to an array that doesn't contain it", () => {
        const tiposPontoVenda: ITiposPontoVenda = { id: 123 };
        const tiposPontoVendaCollection: ITiposPontoVenda[] = [{ id: 456 }];
        expectedResult = service.addTiposPontoVendaToCollectionIfMissing(tiposPontoVendaCollection, tiposPontoVenda);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tiposPontoVenda);
      });

      it('should add only unique TiposPontoVenda to an array', () => {
        const tiposPontoVendaArray: ITiposPontoVenda[] = [{ id: 123 }, { id: 456 }, { id: 26206 }];
        const tiposPontoVendaCollection: ITiposPontoVenda[] = [{ id: 123 }];
        expectedResult = service.addTiposPontoVendaToCollectionIfMissing(tiposPontoVendaCollection, ...tiposPontoVendaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tiposPontoVenda: ITiposPontoVenda = { id: 123 };
        const tiposPontoVenda2: ITiposPontoVenda = { id: 456 };
        expectedResult = service.addTiposPontoVendaToCollectionIfMissing([], tiposPontoVenda, tiposPontoVenda2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tiposPontoVenda);
        expect(expectedResult).toContain(tiposPontoVenda2);
      });

      it('should accept null and undefined values', () => {
        const tiposPontoVenda: ITiposPontoVenda = { id: 123 };
        expectedResult = service.addTiposPontoVendaToCollectionIfMissing([], null, tiposPontoVenda, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tiposPontoVenda);
      });

      it('should return initial array if no TiposPontoVenda is added', () => {
        const tiposPontoVendaCollection: ITiposPontoVenda[] = [{ id: 123 }];
        expectedResult = service.addTiposPontoVendaToCollectionIfMissing(tiposPontoVendaCollection, undefined, null);
        expect(expectedResult).toEqual(tiposPontoVendaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
