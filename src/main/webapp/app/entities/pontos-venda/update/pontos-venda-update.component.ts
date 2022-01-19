import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPontosVenda, PontosVenda } from '../pontos-venda.model';
import { PontosVendaService } from '../service/pontos-venda.service';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';
import { ITiposPontoVenda } from 'app/entities/tipos-ponto-venda/tipos-ponto-venda.model';
import { TiposPontoVendaService } from 'app/entities/tipos-ponto-venda/service/tipos-ponto-venda.service';
import { ITrilhas } from 'app/entities/trilhas/trilhas.model';
import { TrilhasService } from 'app/entities/trilhas/service/trilhas.service';

@Component({
  selector: 'jhi-pontos-venda-update',
  templateUrl: './pontos-venda-update.component.html',
})
export class PontosVendaUpdateComponent implements OnInit {
  isSaving = false;

  pontosCardeaisCollection: IPontosCardeais[] = [];
  tiposPontosVendasCollection: ITiposPontoVenda[] = [];
  trilhasSharedCollection: ITrilhas[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    avaliacao: [],
    pontosCardeais: [],
    tiposPontosVenda: [],
    trilhas: [],
  });

  constructor(
    protected pontosVendaService: PontosVendaService,
    protected pontosCardeaisService: PontosCardeaisService,
    protected tiposPontoVendaService: TiposPontoVendaService,
    protected trilhasService: TrilhasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pontosVenda }) => {
      this.updateForm(pontosVenda);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pontosVenda = this.createFromForm();
    if (pontosVenda.id !== undefined) {
      this.subscribeToSaveResponse(this.pontosVendaService.update(pontosVenda));
    } else {
      this.subscribeToSaveResponse(this.pontosVendaService.create(pontosVenda));
    }
  }

  trackPontosCardeaisById(index: number, item: IPontosCardeais): number {
    return item.id!;
  }

  trackTiposPontoVendaById(index: number, item: ITiposPontoVenda): number {
    return item.id!;
  }

  trackTrilhasById(index: number, item: ITrilhas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPontosVenda>>): void {
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

  protected updateForm(pontosVenda: IPontosVenda): void {
    this.editForm.patchValue({
      id: pontosVenda.id,
      nome: pontosVenda.nome,
      avaliacao: pontosVenda.avaliacao,
      pontosCardeais: pontosVenda.pontosCardeais,
      tiposPontosVenda: pontosVenda.tiposPontosVenda,
      trilhas: pontosVenda.trilhas,
    });

    this.pontosCardeaisCollection = this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(
      this.pontosCardeaisCollection,
      pontosVenda.pontosCardeais
    );
    this.tiposPontosVendasCollection = this.tiposPontoVendaService.addTiposPontoVendaToCollectionIfMissing(
      this.tiposPontosVendasCollection,
      pontosVenda.tiposPontosVenda
    );
    this.trilhasSharedCollection = this.trilhasService.addTrilhasToCollectionIfMissing(this.trilhasSharedCollection, pontosVenda.trilhas);
  }

  protected loadRelationshipsOptions(): void {
    this.pontosCardeaisService
      .query({ filter: 'pontosvenda-is-null' })
      .pipe(map((res: HttpResponse<IPontosCardeais[]>) => res.body ?? []))
      .pipe(
        map((pontosCardeais: IPontosCardeais[]) =>
          this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(pontosCardeais, this.editForm.get('pontosCardeais')!.value)
        )
      )
      .subscribe((pontosCardeais: IPontosCardeais[]) => (this.pontosCardeaisCollection = pontosCardeais));

    this.tiposPontoVendaService
      .query({ filter: 'pontosvenda-is-null' })
      .pipe(map((res: HttpResponse<ITiposPontoVenda[]>) => res.body ?? []))
      .pipe(
        map((tiposPontoVendas: ITiposPontoVenda[]) =>
          this.tiposPontoVendaService.addTiposPontoVendaToCollectionIfMissing(
            tiposPontoVendas,
            this.editForm.get('tiposPontosVenda')!.value
          )
        )
      )
      .subscribe((tiposPontoVendas: ITiposPontoVenda[]) => (this.tiposPontosVendasCollection = tiposPontoVendas));

    this.trilhasService
      .query()
      .pipe(map((res: HttpResponse<ITrilhas[]>) => res.body ?? []))
      .pipe(map((trilhas: ITrilhas[]) => this.trilhasService.addTrilhasToCollectionIfMissing(trilhas, this.editForm.get('trilhas')!.value)))
      .subscribe((trilhas: ITrilhas[]) => (this.trilhasSharedCollection = trilhas));
  }

  protected createFromForm(): IPontosVenda {
    return {
      ...new PontosVenda(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
      pontosCardeais: this.editForm.get(['pontosCardeais'])!.value,
      tiposPontosVenda: this.editForm.get(['tiposPontosVenda'])!.value,
      trilhas: this.editForm.get(['trilhas'])!.value,
    };
  }
}
