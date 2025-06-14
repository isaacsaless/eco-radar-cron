export type Ponto = {
  latitude: number;
  longitude: number;
};

export type Propriedade = {
  nome: string;
  latitude: number;
  longitude: number;
  raioKm: number;
  owner_id: string;
};

export type Foco = {
  latitude: number;
  longitude: number;
  frp: number;
};

export type ApiFoco = {
  latitude: string;
  longitude: string;
  frp: string;
};

export type FirebasePropriedade = {
  nome: string;
  latitude: string;
  longitude: string;
  raio: string;
  owner_id: string;
};