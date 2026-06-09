
export interface ClimaData {
  nombre: string
  tempDisenoVerano: number;
  tempDisenoInvierno: number;
  radiacionSolar: number;
}

export interface MaterialData {
  nombre: string;
  resistenciaTermica: number;
  densidad: number;
  calorEspecifico: number
}

export interface BuildingConfig {
  areaMurosNorte: number;
  areaMurosSur: number;
  areaMurosEste: number;
  areaMurosOeste: number;
  areaVentanasNorte: number;
  areaVentanasSur: number;
  areaVentanasEste: number;
  areaVentanasOeste: number;
  tipoMaterial: string;
  numPersonas: number;
  potenciaLuces: number;
  potenciaEquipos: number;
  temperaturaInterior: number;
  ciudad: string;
  // orientacion: "N" | "S" | "E" | "O",
  nombreProyecto?: string | undefined
} 