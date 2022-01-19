import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TiposPontoVendaComponent } from './list/tipos-ponto-venda.component';
import { TiposPontoVendaDetailComponent } from './detail/tipos-ponto-venda-detail.component';
import { TiposPontoVendaUpdateComponent } from './update/tipos-ponto-venda-update.component';
import { TiposPontoVendaDeleteDialogComponent } from './delete/tipos-ponto-venda-delete-dialog.component';
import { TiposPontoVendaRoutingModule } from './route/tipos-ponto-venda-routing.module';

@NgModule({
  imports: [SharedModule, TiposPontoVendaRoutingModule],
  declarations: [
    TiposPontoVendaComponent,
    TiposPontoVendaDetailComponent,
    TiposPontoVendaUpdateComponent,
    TiposPontoVendaDeleteDialogComponent,
  ],
  entryComponents: [TiposPontoVendaDeleteDialogComponent],
})
export class TiposPontoVendaModule {}
