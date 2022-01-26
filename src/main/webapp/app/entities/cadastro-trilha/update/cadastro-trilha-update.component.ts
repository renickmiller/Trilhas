import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICadastroTrilha, CadastroTrilha } from '../cadastro-trilha.model';
import { CadastroTrilhaService } from '../service/cadastro-trilha.service';
import { ITrilhas } from 'app/entities/trilhas/trilhas.model';
import { TrilhasService } from 'app/entities/trilhas/service/trilhas.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-cadastro-trilha-update',
  templateUrl: './cadastro-trilha-update.component.html',
})
export class CadastroTrilhaUpdateComponent implements OnInit {
  isSaving = false;

  trilhasCollection: ITrilhas[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm = this.fb.group({
    id: [],
    dataHora: [],
    trilhas: [],
    usuario: [],
  });

  constructor(
    protected cadastroTrilhaService: CadastroTrilhaService,
    protected trilhasService: TrilhasService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadastroTrilha }) => {
      this.updateForm(cadastroTrilha);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cadastroTrilha = this.createFromForm();
    if (cadastroTrilha.id !== undefined) {
      this.subscribeToSaveResponse(this.cadastroTrilhaService.update(cadastroTrilha));
    } else {
      this.subscribeToSaveResponse(this.cadastroTrilhaService.create(cadastroTrilha));
    }
  }

  trackTrilhasById(index: number, item: ITrilhas): number {
    return item.id!;
  }

  trackUsuarioById(index: number, item: IUsuario): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICadastroTrilha>>): void {
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

  protected updateForm(cadastroTrilha: ICadastroTrilha): void {
    this.editForm.patchValue({
      id: cadastroTrilha.id,
      dataHora: cadastroTrilha.dataHora,
      trilhas: cadastroTrilha.trilhas,
      usuario: cadastroTrilha.usuario,
    });

    this.trilhasCollection = this.trilhasService.addTrilhasToCollectionIfMissing(this.trilhasCollection, cadastroTrilha.trilhas);
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(
      this.usuariosSharedCollection,
      cadastroTrilha.usuario
    );
  }

  protected loadRelationshipsOptions(): void {
    this.trilhasService
      .query({ filter: 'cadastrotrilha-is-null' })
      .pipe(map((res: HttpResponse<ITrilhas[]>) => res.body ?? []))
      .pipe(map((trilhas: ITrilhas[]) => this.trilhasService.addTrilhasToCollectionIfMissing(trilhas, this.editForm.get('trilhas')!.value)))
      .subscribe((trilhas: ITrilhas[]) => (this.trilhasCollection = trilhas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, this.editForm.get('usuario')!.value))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }

  protected createFromForm(): ICadastroTrilha {
    return {
      ...new CadastroTrilha(),
      id: this.editForm.get(['id'])!.value,
      dataHora: this.editForm.get(['dataHora'])!.value,
      trilhas: this.editForm.get(['trilhas'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }
}
