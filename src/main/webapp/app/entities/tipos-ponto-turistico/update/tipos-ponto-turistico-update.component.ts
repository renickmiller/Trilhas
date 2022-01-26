import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITiposPontoTuristico, TiposPontoTuristico } from '../tipos-ponto-turistico.model';
import { TiposPontoTuristicoService } from '../service/tipos-ponto-turistico.service';

@Component({
  selector: 'jhi-tipos-ponto-turistico-update',
  templateUrl: './tipos-ponto-turistico-update.component.html',
})
export class TiposPontoTuristicoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
  });

  constructor(
    protected tiposPontoTuristicoService: TiposPontoTuristicoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tiposPontoTuristico }) => {
      this.updateForm(tiposPontoTuristico);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tiposPontoTuristico = this.createFromForm();
    if (tiposPontoTuristico.id !== undefined) {
      this.subscribeToSaveResponse(this.tiposPontoTuristicoService.update(tiposPontoTuristico));
    } else {
      this.subscribeToSaveResponse(this.tiposPontoTuristicoService.create(tiposPontoTuristico));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITiposPontoTuristico>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(tiposPontoTuristico: ITiposPontoTuristico): void {
    this.editForm.patchValue({
      id: tiposPontoTuristico.id,
      nome: tiposPontoTuristico.nome,
      descricao: tiposPontoTuristico.descricao,
    });
  }

  protected createFromForm(): ITiposPontoTuristico {
    return {
      ...new TiposPontoTuristico(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
