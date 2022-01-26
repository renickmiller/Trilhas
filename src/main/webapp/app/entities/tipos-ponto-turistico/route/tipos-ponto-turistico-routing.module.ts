import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TiposPontoTuristicoComponent } from '../list/tipos-ponto-turistico.component';
import { TiposPontoTuristicoDetailComponent } from '../detail/tipos-ponto-turistico-detail.component';
import { TiposPontoTuristicoUpdateComponent } from '../update/tipos-ponto-turistico-update.component';
import { TiposPontoTuristicoRoutingResolveService } from './tipos-ponto-turistico-routing-resolve.service';

const tiposPontoTuristicoRoute: Routes = [
  {
    path: '',
    component: TiposPontoTuristicoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TiposPontoTuristicoDetailComponent,
    resolve: {
      tiposPontoTuristico: TiposPontoTuristicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TiposPontoTuristicoUpdateComponent,
    resolve: {
      tiposPontoTuristico: TiposPontoTuristicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TiposPontoTuristicoUpdateComponent,
    resolve: {
      tiposPontoTuristico: TiposPontoTuristicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tiposPontoTuristicoRoute)],
  exports: [RouterModule],
})
export class TiposPontoTuristicoRoutingModule {}
