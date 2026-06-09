import type { ClimaData, MaterialData } from "./interfaces";


export const climaDB: Record<string, ClimaData> = {
  madrid: {
    tempDisenoVerano: 37,
    tempDisenoInvierno: -3,
    radiacionSolar: 280,
    nombre: 'Madrid'
  },
  barcelona: {
    tempDisenoVerano: 34,
    tempDisenoInvierno: 1,
    radiacionSolar: 260,
    nombre: 'Barcelona'
  },
  sevilla: {
    tempDisenoVerano: 41,
    tempDisenoInvierno: 2,
    radiacionSolar: 310,
    nombre: 'Sevilla'
  },
  bilbao: {
    tempDisenoVerano: 32,
    tempDisenoInvierno: 0,
    radiacionSolar: 230,
    nombre: 'Bilbao'
  },
  valencia: {
    tempDisenoVerano: 35,
    tempDisenoInvierno: 2,
    radiacionSolar: 270,
    nombre: 'Valencia'
  },
  // Agregar más ciudades
  malaga: {
    tempDisenoVerano: 38,
    tempDisenoInvierno: 5,
    radiacionSolar: 290,
    nombre: 'Málaga'
  },
  zaragoza: {
    tempDisenoVerano: 39,
    tempDisenoInvierno: -2,
    radiacionSolar: 275,
    nombre: 'Zaragoza'
  }
}

export const materialesDB: Record<string, MaterialData> = {
  ladrilloHueco: {
    resistenciaTermica: 0.52,
    nombre: 'Ladrillo hueco',
    densidad: 1200,
    calorEspecifico: 840
  },
  hormigon: {
    resistenciaTermica: 0.35,
    nombre: 'Hormigón',
    densidad: 2400,
    calorEspecifico: 880
  },
  aislado: {
    resistenciaTermica: 2.00,
    nombre: 'Muro con aislamiento (lana de roca 5cm)',
    densidad: 40,
    calorEspecifico: 700
  },
  ladrilloMacizo: {
    resistenciaTermica: 0.45,
    nombre: 'Ladrillo macizo',
    densidad: 1800,
    calorEspecifico: 840
  },
  bloqueHormigon: {
    resistenciaTermica: 0.30,
    nombre: 'Bloque de hormigón',
    densidad: 1600,
    calorEspecifico: 880
  },
  madera: {
    resistenciaTermica: 0.80,
    nombre: 'Madera (pane l sándwich)',
    densidad: 500,
    calorEspecifico: 1600
  }
};

// Factores de ganancia solar (W/m²) - ASHRAE valores típicos
export const gananciaSolarPorOrientacionMuros: Record<string, number> = {
  N: 35,
  S: 150,
  E: 180,
  O: 200
};

export const gananciaSolarPorOrientacionVentanas: Record<string, number> = {
  N: 50,
  S: 200,
  E: 220,
  O: 250
};