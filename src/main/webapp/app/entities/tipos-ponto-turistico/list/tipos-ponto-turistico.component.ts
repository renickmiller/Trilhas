import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITiposPontoTuristico } from '../tipos-ponto-turistico.model';
import { TiposPontoTuristicoService } from '../service/tipos-ponto-turistico.service';
import { TiposPontoTuristicoDeleteDialogComponent } from '../delete/tipos-ponto-turistico-delete-dialog.component';

@Component({
  selector: 'jhi-tipos-ponto-turistico',
  templateUrl: './tipos-ponto-turistico.component.html',
})
export class TiposPontoTuristicoComponent implements OnInit {
  tiposPontoTuristicos?: ITiposPontoTuristico[];
  isLoading = false;

  constructor(protected tiposPontoTuristicoService: TiposPontoTuristicoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tiposPontoTuristicoService.query().subscribe({
      next: (res: HttpResponse<ITiposPontoTuristico[]>) => {
        this.isLoading = false;
        this.tiposPontoTuristicos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITiposPontoTuristico): number {
    return item.id!;
  }

  delete(tiposPontoTuristico: ITiposPontoTuristico): void {
    const modalRef = this.modalService.open(TiposPontoTuristicoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tiposPontoTuristico = tiposPontoTuristico;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
