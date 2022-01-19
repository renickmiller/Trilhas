import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TiposPontoVendaDetailComponent } from './tipos-ponto-venda-detail.component';

describe('TiposPontoVenda Management Detail Component', () => {
  let comp: TiposPontoVendaDetailComponent;
  let fixture: ComponentFixture<TiposPontoVendaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposPontoVendaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tiposPontoVenda: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TiposPontoVendaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TiposPontoVendaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tiposPontoVenda on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tiposPontoVenda).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
