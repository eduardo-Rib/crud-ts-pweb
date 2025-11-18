export interface Continent {
  id: number;
  nome: string;
  descricao: string;
}

export interface Country {
  id: number;
  nome: string;
  populacao: number;
  idioma_ofc: string;
  moeda: string;
  id_continente: number;
  continente?: Continent;
}

export interface City {
  id: number;
  nome: string;
  populacao: number;
  latitude: string;
  longitude: string;
  id_pais: number;
  pais?: Country;
}