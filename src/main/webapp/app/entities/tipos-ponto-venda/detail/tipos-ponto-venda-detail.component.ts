import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITiposPontoVenda } from '../tipos-ponto-venda.model';

@Component({
  selector: 'jhi-tipos-ponto-venda-detail',
  templateUrl: './tipos-ponto-venda-detail.component.html',
})
export class TiposPontoVendaDetailComponent implements OnInit {
  tiposPontoVenda: ITiposPontoVenda | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tiposPontoVenda }) => {
      this.tiposPontoVenda = tiposPontoVenda;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
