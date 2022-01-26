export interface ITiposPontoTuristico {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
}

export class TiposPontoTuristico implements ITiposPontoTuristico {
  constructor(public id?: number, public nome?: string | null, public descricao?: string | null) {}
}

export function getTiposPontoTuristicoIdentifier(tiposPontoTuristico: ITiposPontoTuristico): number | undefined {
  return tiposPontoTuristico.id;
}
