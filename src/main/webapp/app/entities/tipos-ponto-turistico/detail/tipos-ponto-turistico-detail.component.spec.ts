import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TiposPontoTuristicoDetailComponent } from './tipos-ponto-turistico-detail.component';

describe('TiposPontoTuristico Management Detail Component', () => {
  let comp: TiposPontoTuristicoDetailComponent;
  let fixture: ComponentFixture<TiposPontoTuristicoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposPontoTuristicoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tiposPontoTuristico: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TiposPontoTuristicoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TiposPontoTuristicoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tiposPontoTuristico on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tiposPontoTuristico).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
