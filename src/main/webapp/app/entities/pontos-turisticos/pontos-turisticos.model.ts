import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { ITiposPontoTuristico } from 'app/entities/tipos-ponto-turistico/tipos-ponto-turistico.model';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { ITrilhas } from 'app/entities/trilhas/trilhas.model';

export interface IPontosTuristicos {
  id?: number;
  nome?: string | null;
  descricao?: string | null;
  avaliacao?: number | null;
  pontosCardeais?: IPontosCardeais | null;
  tiposPontoTuristico?: ITiposPontoTuristico | null;
  fotografias?: IFotografias[] | null;
  trilhas?: ITrilhas | null;
}

export class PontosTuristicos implements IPontosTuristicos {
  constructor(
    public id?: number,
    public nome?: string | null,
    public descricao?: string | null,
    public avaliacao?: number | null,
    public pontosCardeais?: IPontosCardeais | null,
    public tiposPontoTuristico?: ITiposPontoTuristico | null,
    public fotografias?: IFotografias[] | null,
    public trilhas?: ITrilhas | null
  ) {}
}

export function getPontosTuristicosIdentifier(pontosTuristicos: IPontosTuristicos): number | undefined {
  return pontosTuristicos.id;
}
