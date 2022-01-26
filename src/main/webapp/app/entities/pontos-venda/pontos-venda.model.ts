import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { ITiposPontoVenda } from 'app/entities/tipos-ponto-venda/tipos-ponto-venda.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { ITrilhas } from 'app/entities/trilhas/trilhas.model';

export interface IPontosVenda {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  avaliacao?: number | null;
  pontosCardeais?: IPontosCardeais | null;
  tiposPontosVenda?: ITiposPontoVenda | null;
  fotografias?: IFotografias[] | null;
  trilhas?: ITrilhas | null;
}

export class PontosVenda implements IPontosVenda {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public avaliacao?: number | null,
    public pontosCardeais?: IPontosCardeais | null,
    public tiposPontosVenda?: ITiposPontoVenda | null,
    public fotografias?: IFotografias[] | null,
    public trilhas?: ITrilhas | null
  ) {}
}

export function getPontosVendaIdentifier(pontosVenda: IPontosVenda): number | undefined {
  return pontosVenda.id;
}
