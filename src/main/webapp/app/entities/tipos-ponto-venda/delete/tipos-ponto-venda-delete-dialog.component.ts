import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITiposPontoVenda } from '../tipos-ponto-venda.model';
import { TiposPontoVendaService } from '../service/tipos-ponto-venda.service';

@Component({
  templateUrl: './tipos-ponto-venda-delete-dialog.component.html',
})
export class TiposPontoVendaDeleteDialogComponent {
  tiposPontoVenda?: ITiposPontoVenda;

  constructor(protected tiposPontoVendaService: TiposPontoVendaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tiposPontoVendaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
