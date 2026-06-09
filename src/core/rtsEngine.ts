import { Rse, Rsi, DEFAULT_VALUES } from "./constants";
import { climaDB, gananciaSolarPorOrientacionMuros, materialesDB } from './database'

import { BuildingConfig } from "./interfaces";

export function calcularUValor(resistenciaTermica: number): number {

  // U = 1 / (Rsi + R_material + Rse)
  // Calcula la transmitancia térmica (W/m²K) a partir de la resistencia del material
  const result = 1 / (Rsi + resistenciaTermica + Rse)

  return result
}

export function calculateCoolingLoad(VarEntradas: BuildingConfig) {

  const { areaMurosEste, areaMurosNorte, areaMurosOeste, areaMurosSur, areaVentanasEste, areaVentanasNorte, areaVentanasOeste, areaVentanasSur, ciudad, numPersonas, potenciaEquipos, potenciaLuces, temperaturaInterior, tipoMaterial } = VarEntradas

  const datosClima = climaDB[ciudad.toLowerCase()];

  if (!datosClima) {
    throw new Error(`No se encuentran los datos climaticos para la ciudad ${ciudad}`);
  }

  const material = materialesDB[tipoMaterial]

  if (!material) {
    throw new Error(`Material "${tipoMaterial}" no encontrado`);
  }

  const UValor = calcularUValor(material.resistenciaTermica);

  const { cargaPorPersona, factorDeInfiltracion, factorGananciaSolar, factorSeguridad, factorSombreado } = DEFAULT_VALUES




  const deltaT = datosClima.tempDisenoVerano - temperaturaInterior

const gananciaSolarMuros = gananciaSolarPorOrientacionMuros[]

  const areaMurosTotal = areaMurosEste + areaMurosNorte + areaMurosOeste + areaMurosSur;
  const cargaTransmision = areaMurosTotal * UValor * deltaT;

  const gananciaMurosNorte = areaMurosNorte * gananciaSolarPorOrientacionMuros.N * factorSombreado * factorGananciaSolar;



















  const areaVentanasTotal = areaVentanasNorte + areaVentanasSur + areaVentanasEste + areaVentanasOeste;
  const cargaTransmisionVentanas = areaVentanasTotal * factorUVentana * deltaT;

  const cargaSolarVentana = areaVentanas * gananciaSolarPorOrientacion[orientacion] * factorSombreado * factorGananciaSolar;

  const cargaPersonas = numPersonas * cargaPorPersona;

  const cargaInfiltracion = (cargaTransmision + cargaSolarVentana + cargaPersonas + potenciaLuces + potenciaEquipos) * factorDeInfiltracion;

  const cargaTotal = cargaTransmision + cargaSolarVentana + cargaPersonas + potenciaLuces + potenciaEquipos + cargaInfiltracion;

  const totalFs = Math.ceil(cargaTotal * (1 + factorSeguridad))

  const Btu = Math.ceil(totalFs * 3.412)

  const TR = Btu / 12000

  return {
    watts: totalFs,
    btuH: Btu,
    TR: TR,
    desglose: {
      transmision: cargaTransmision,
      solar: cargaSolarVentana,
      personas: cargaPersonas,
      luces: potenciaLuces,
      equipos: potenciaEquipos,
      infiltracion: cargaInfiltracion
    },
    detalles: {
      uValor: UValor,
      deltaT: deltaT
    }
  }
}

export function calculateHeatingLoad(VarEntradas: BuildingConfig) {

  const { areaMuros, areaVentanas, ciudad, numPersonas, orientacion, potenciaEquipos, potenciaLuces, temperaturaInterior, tipoMaterial } = VarEntradas

  const datosClima = climaDB[ciudad.toLowerCase()];

  if (!datosClima) {
    throw new Error(`No se encuentran los datos climaticos para la ciudad ${ciudad}`);
  }

  const material = materialesDB[tipoMaterial]

  if (!material) {
    throw new Error(`Material "${tipoMaterial}" no encontrado`);
  }

  const UValor = calcularUValor(material.resistenciaTermica);

  const { cargaPorPersona, factorSeguridad, factorSombreado, factorDeInfiltracionInvierno, factorSombreadoInvierno } = DEFAULT_VALUES


  const deltaT = temperaturaInterior - datosClima.tempDisenoInvierno

  const cargaTransmision = areaMuros * UValor * deltaT;

  const ayudaSolar = areaVentanas * gananciaSolarPorOrientacion[orientacion] * factorSombreadoInvierno;

  const cargaPersonas = numPersonas * cargaPorPersona;

  const cargaInfiltracion = (cargaTransmision + cargaPersonas + potenciaLuces + potenciaEquipos) * factorDeInfiltracionInvierno;

  const cargaTotal = cargaTransmision - ayudaSolar + cargaPersonas + potenciaLuces + potenciaEquipos + cargaInfiltracion;

  const totalFs = Math.ceil(cargaTotal * (1 + factorSeguridad))

  const Btu = Math.ceil(totalFs * 3.412)

  return {
    watts: totalFs,
    btuH: Btu,
    desglose: {
      transmision: cargaTransmision,
      solar: -ayudaSolar,    // valor negativo
      personas: cargaPersonas,
      luces: potenciaLuces,
      equipos: potenciaEquipos,
      infiltracion: cargaInfiltracion
    },
    detalles: {
      uValor: UValor,
      deltaT: deltaT
    }
  }
}


//unificar las funciones
export function calculateLoads(valores: BuildingConfig) {

  const cooling = calculateCoolingLoad(valores);
  const heating = calculateHeatingLoad(valores)

  return {
    cooling: { ...cooling },
    heating: { ...heating }
  }

}