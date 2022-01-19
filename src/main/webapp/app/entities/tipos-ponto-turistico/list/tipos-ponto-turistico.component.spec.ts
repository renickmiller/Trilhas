import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TiposPontoTuristicoService } from '../service/tipos-ponto-turistico.service';

import { TiposPontoTuristicoComponent } from './tipos-ponto-turistico.component';

describe('TiposPontoTuristico Management Component', () => {
  let comp: TiposPontoTuristicoComponent;
  let fixture: ComponentFixture<TiposPontoTuristicoComponent>;
  let service: TiposPontoTuristicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TiposPontoTuristicoComponent],
    })
      .overrideTemplate(TiposPontoTuristicoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TiposPontoTuristicoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TiposPontoTuristicoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.tiposPontoTuristicos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
