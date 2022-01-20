import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITiposPontoTuristico } from '../tipos-ponto-turistico.model';

@Component({
  selector: 'jhi-tipos-ponto-turistico-detail',
  templateUrl: './tipos-ponto-turistico-detail.component.html',
})
export class TiposPontoTuristicoDetailComponent implements OnInit {
  tiposPontoTuristico: ITiposPontoTuristico | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tiposPontoTuristico }) => {
      this.tiposPontoTuristico = tiposPontoTuristico;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
