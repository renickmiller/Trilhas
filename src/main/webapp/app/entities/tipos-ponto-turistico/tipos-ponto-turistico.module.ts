import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TiposPontoTuristicoComponent } from './list/tipos-ponto-turistico.component';
import { TiposPontoTuristicoDetailComponent } from './detail/tipos-ponto-turistico-detail.component';
import { TiposPontoTuristicoUpdateComponent } from './update/tipos-ponto-turistico-update.component';
import { TiposPontoTuristicoDeleteDialogComponent } from './delete/tipos-ponto-turistico-delete-dialog.component';
import { TiposPontoTuristicoRoutingModule } from './route/tipos-ponto-turistico-routing.module';

@NgModule({
  imports: [SharedModule, TiposPontoTuristicoRoutingModule],
  declarations: [
    TiposPontoTuristicoComponent,
    TiposPontoTuristicoDetailComponent,
    TiposPontoTuristicoUpdateComponent,
    TiposPontoTuristicoDeleteDialogComponent,
  ],
  entryComponents: [TiposPontoTuristicoDeleteDialogComponent],
})
export class TiposPontoTuristicoModule {}
