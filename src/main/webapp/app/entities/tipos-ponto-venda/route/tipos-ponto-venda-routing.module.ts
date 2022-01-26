import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TiposPontoVendaComponent } from '../list/tipos-ponto-venda.component';
import { TiposPontoVendaDetailComponent } from '../detail/tipos-ponto-venda-detail.component';
import { TiposPontoVendaUpdateComponent } from '../update/tipos-ponto-venda-update.component';
import { TiposPontoVendaRoutingResolveService } from './tipos-ponto-venda-routing-resolve.service';

const tiposPontoVendaRoute: Routes = [
  {
    path: '',
    component: TiposPontoVendaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TiposPontoVendaDetailComponent,
    resolve: {
      tiposPontoVenda: TiposPontoVendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TiposPontoVendaUpdateComponent,
    resolve: {
      tiposPontoVenda: TiposPontoVendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TiposPontoVendaUpdateComponent,
    resolve: {
      tiposPontoVenda: TiposPontoVendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tiposPontoVendaRoute)],
  exports: [RouterModule],
})
export class TiposPontoVendaRoutingModule {}
