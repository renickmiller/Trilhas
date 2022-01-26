import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITiposPontoVenda } from '../tipos-ponto-venda.model';
import { TiposPontoVendaService } from '../service/tipos-ponto-venda.service';
import { TiposPontoVendaDeleteDialogComponent } from '../delete/tipos-ponto-venda-delete-dialog.component';

@Component({
  selector: 'jhi-tipos-ponto-venda',
  templateUrl: './tipos-ponto-venda.component.html',
})
export class TiposPontoVendaComponent implements OnInit {
  tiposPontoVendas?: ITiposPontoVenda[];
  isLoading = false;

  constructor(protected tiposPontoVendaService: TiposPontoVendaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tiposPontoVendaService.query().subscribe({
      next: (res: HttpResponse<ITiposPontoVenda[]>) => {
        this.isLoading = false;
        this.tiposPontoVendas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITiposPontoVenda): number {
    return item.id!;
  }

  delete(tiposPontoVenda: ITiposPontoVenda): void {
    const modalRef = this.modalService.open(TiposPontoVendaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tiposPontoVenda = tiposPontoVenda;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
