
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
  // Identificación
  nombreProyecto?: string;
  
  // Áreas de muros por orientación (m²)
  areaMurosNorte: number;
  areaMurosSur: number;
  areaMurosEste: number;
  areaMurosOeste: number;
  
  // Áreas de ventanas por orientación (m²)
  areaVentanasNorte: number;
  areaVentanasSur: number;
  areaVentanasEste: number;
  areaVentanasOeste: number;
  
  // Cargas internas
  numPersonas: number;
  potenciaLuces: number;
  potenciaEquipos: number;
  
  // Condiciones
  temperaturaInterior: number;
  
  // Materiales (por ahora, un solo tipo para todos los muros)
  tipoMaterial: string;
  
  // Ubicación
  ciudad: string;
}