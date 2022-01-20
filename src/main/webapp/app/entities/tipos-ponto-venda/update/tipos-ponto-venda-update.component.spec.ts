import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TiposPontoVendaService } from '../service/tipos-ponto-venda.service';
import { ITiposPontoVenda, TiposPontoVenda } from '../tipos-ponto-venda.model';

import { TiposPontoVendaUpdateComponent } from './tipos-ponto-venda-update.component';

describe('TiposPontoVenda Management Update Component', () => {
  let comp: TiposPontoVendaUpdateComponent;
  let fixture: ComponentFixture<TiposPontoVendaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tiposPontoVendaService: TiposPontoVendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TiposPontoVendaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TiposPontoVendaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TiposPontoVendaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tiposPontoVendaService = TestBed.inject(TiposPontoVendaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tiposPontoVenda: ITiposPontoVenda = { id: 456 };

      activatedRoute.data = of({ tiposPontoVenda });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tiposPontoVenda));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TiposPontoVenda>>();
      const tiposPontoVenda = { id: 123 };
      jest.spyOn(tiposPontoVendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tiposPontoVenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tiposPontoVenda }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tiposPontoVendaService.update).toHaveBeenCalledWith(tiposPontoVenda);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TiposPontoVenda>>();
      const tiposPontoVenda = new TiposPontoVenda();
      jest.spyOn(tiposPontoVendaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tiposPontoVenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tiposPontoVenda }));
      saveSubject.complete();

      // THEN
      expect(tiposPontoVendaService.create).toHaveBeenCalledWith(tiposPontoVenda);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TiposPontoVenda>>();
      const tiposPontoVenda = { id: 123 };
      jest.spyOn(tiposPontoVendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tiposPontoVenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tiposPontoVendaService.update).toHaveBeenCalledWith(tiposPontoVenda);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
