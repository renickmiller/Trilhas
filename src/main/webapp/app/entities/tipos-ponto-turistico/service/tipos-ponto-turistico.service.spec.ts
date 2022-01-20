import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITiposPontoTuristico, TiposPontoTuristico } from '../tipos-ponto-turistico.model';

import { TiposPontoTuristicoService } from './tipos-ponto-turistico.service';

describe('TiposPontoTuristico Service', () => {
  let service: TiposPontoTuristicoService;
  let httpMock: HttpTestingController;
  let elemDefault: ITiposPontoTuristico;
  let expectedResult: ITiposPontoTuristico | ITiposPontoTuristico[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TiposPontoTuristicoService);
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

    it('should create a TiposPontoTuristico', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TiposPontoTuristico()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TiposPontoTuristico', () => {
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

    it('should partial update a TiposPontoTuristico', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new TiposPontoTuristico()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TiposPontoTuristico', () => {
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

    it('should delete a TiposPontoTuristico', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTiposPontoTuristicoToCollectionIfMissing', () => {
      it('should add a TiposPontoTuristico to an empty array', () => {
        const tiposPontoTuristico: ITiposPontoTuristico = { id: 123 };
        expectedResult = service.addTiposPontoTuristicoToCollectionIfMissing([], tiposPontoTuristico);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tiposPontoTuristico);
      });

      it('should not add a TiposPontoTuristico to an array that contains it', () => {
        const tiposPontoTuristico: ITiposPontoTuristico = { id: 123 };
        const tiposPontoTuristicoCollection: ITiposPontoTuristico[] = [
          {
            ...tiposPontoTuristico,
          },
          { id: 456 },
        ];
        expectedResult = service.addTiposPontoTuristicoToCollectionIfMissing(tiposPontoTuristicoCollection, tiposPontoTuristico);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TiposPontoTuristico to an array that doesn't contain it", () => {
        const tiposPontoTuristico: ITiposPontoTuristico = { id: 123 };
        const tiposPontoTuristicoCollection: ITiposPontoTuristico[] = [{ id: 456 }];
        expectedResult = service.addTiposPontoTuristicoToCollectionIfMissing(tiposPontoTuristicoCollection, tiposPontoTuristico);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tiposPontoTuristico);
      });

      it('should add only unique TiposPontoTuristico to an array', () => {
        const tiposPontoTuristicoArray: ITiposPontoTuristico[] = [{ id: 123 }, { id: 456 }, { id: 94087 }];
        const tiposPontoTuristicoCollection: ITiposPontoTuristico[] = [{ id: 123 }];
        expectedResult = service.addTiposPontoTuristicoToCollectionIfMissing(tiposPontoTuristicoCollection, ...tiposPontoTuristicoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tiposPontoTuristico: ITiposPontoTuristico = { id: 123 };
        const tiposPontoTuristico2: ITiposPontoTuristico = { id: 456 };
        expectedResult = service.addTiposPontoTuristicoToCollectionIfMissing([], tiposPontoTuristico, tiposPontoTuristico2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tiposPontoTuristico);
        expect(expectedResult).toContain(tiposPontoTuristico2);
      });

      it('should accept null and undefined values', () => {
        const tiposPontoTuristico: ITiposPontoTuristico = { id: 123 };
        expectedResult = service.addTiposPontoTuristicoToCollectionIfMissing([], null, tiposPontoTuristico, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tiposPontoTuristico);
      });

      it('should return initial array if no TiposPontoTuristico is added', () => {
        const tiposPontoTuristicoCollection: ITiposPontoTuristico[] = [{ id: 123 }];
        expectedResult = service.addTiposPontoTuristicoToCollectionIfMissing(tiposPontoTuristicoCollection, undefined, null);
        expect(expectedResult).toEqual(tiposPontoTuristicoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
