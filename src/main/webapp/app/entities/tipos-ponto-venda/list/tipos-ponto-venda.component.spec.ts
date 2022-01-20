import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TiposPontoVendaService } from '../service/tipos-ponto-venda.service';

import { TiposPontoVendaComponent } from './tipos-ponto-venda.component';

describe('TiposPontoVenda Management Component', () => {
  let comp: TiposPontoVendaComponent;
  let fixture: ComponentFixture<TiposPontoVendaComponent>;
  let service: TiposPontoVendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TiposPontoVendaComponent],
    })
      .overrideTemplate(TiposPontoVendaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TiposPontoVendaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TiposPontoVendaService);

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
    expect(comp.tiposPontoVendas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
