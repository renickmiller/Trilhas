import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TiposPontoTuristicoService } from '../service/tipos-ponto-turistico.service';
import { ITiposPontoTuristico, TiposPontoTuristico } from '../tipos-ponto-turistico.model';

import { TiposPontoTuristicoUpdateComponent } from './tipos-ponto-turistico-update.component';

describe('TiposPontoTuristico Management Update Component', () => {
  let comp: TiposPontoTuristicoUpdateComponent;
  let fixture: ComponentFixture<TiposPontoTuristicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tiposPontoTuristicoService: TiposPontoTuristicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TiposPontoTuristicoUpdateComponent],
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
      .overrideTemplate(TiposPontoTuristicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TiposPontoTuristicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tiposPontoTuristicoService = TestBed.inject(TiposPontoTuristicoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tiposPontoTuristico: ITiposPontoTuristico = { id: 456 };

      activatedRoute.data = of({ tiposPontoTuristico });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tiposPontoTuristico));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TiposPontoTuristico>>();
      const tiposPontoTuristico = { id: 123 };
      jest.spyOn(tiposPontoTuristicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tiposPontoTuristico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tiposPontoTuristico }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tiposPontoTuristicoService.update).toHaveBeenCalledWith(tiposPontoTuristico);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TiposPontoTuristico>>();
      const tiposPontoTuristico = new TiposPontoTuristico();
      jest.spyOn(tiposPontoTuristicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tiposPontoTuristico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tiposPontoTuristico }));
      saveSubject.complete();

      // THEN
      expect(tiposPontoTuristicoService.create).toHaveBeenCalledWith(tiposPontoTuristico);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TiposPontoTuristico>>();
      const tiposPontoTuristico = { id: 123 };
      jest.spyOn(tiposPontoTuristicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tiposPontoTuristico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tiposPontoTuristicoService.update).toHaveBeenCalledWith(tiposPontoTuristico);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
