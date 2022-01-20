export interface ITiposPontoVenda {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
}

export class TiposPontoVenda implements ITiposPontoVenda {
  constructor(public id?: number, public nome?: string | null, public descricao?: string | null) {}
}

export function getTiposPontoVendaIdentifier(tiposPontoVenda: ITiposPontoVenda): number | undefined {
  return tiposPontoVenda.id;
}
