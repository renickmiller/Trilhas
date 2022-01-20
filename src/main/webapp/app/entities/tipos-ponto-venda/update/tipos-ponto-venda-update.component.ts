import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITiposPontoVenda, TiposPontoVenda } from '../tipos-ponto-venda.model';
import { TiposPontoVendaService } from '../service/tipos-ponto-venda.service';

@Component({
  selector: 'jhi-tipos-ponto-venda-update',
  templateUrl: './tipos-ponto-venda-update.component.html',
})
export class TiposPontoVendaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
  });

  constructor(
    protected tiposPontoVendaService: TiposPontoVendaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tiposPontoVenda }) => {
      this.updateForm(tiposPontoVenda);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tiposPontoVenda = this.createFromForm();
    if (tiposPontoVenda.id !== undefined) {
      this.subscribeToSaveResponse(this.tiposPontoVendaService.update(tiposPontoVenda));
    } else {
      this.subscribeToSaveResponse(this.tiposPontoVendaService.create(tiposPontoVenda));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITiposPontoVenda>>): void {
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

  protected updateForm(tiposPontoVenda: ITiposPontoVenda): void {
    this.editForm.patchValue({
      id: tiposPontoVenda.id,
      nome: tiposPontoVenda.nome,
      descricao: tiposPontoVenda.descricao,
    });
  }

  protected createFromForm(): ITiposPontoVenda {
    return {
      ...new TiposPontoVenda(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
