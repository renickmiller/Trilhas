import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITiposPontoTuristico } from '../tipos-ponto-turistico.model';
import { TiposPontoTuristicoService } from '../service/tipos-ponto-turistico.service';

@Component({
  templateUrl: './tipos-ponto-turistico-delete-dialog.component.html',
})
export class TiposPontoTuristicoDeleteDialogComponent {
  tiposPontoTuristico?: ITiposPontoTuristico;

  constructor(protected tiposPontoTuristicoService: TiposPontoTuristicoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tiposPontoTuristicoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
