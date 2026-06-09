import { Rse, Rsi, DEFAULT_VALUES } from "./constants";
import { climaDB, gananciaSolarPorOrientacionMuros, gananciaSolarPorOrientacionVentanas, materialesDB } from './database'

import type { BuildingConfig } from "./interfaces";

export function calcularUValor(resistenciaTermica: number): number {

  // U = 1 / (Rsi + R_material + Rse)
  // Calcula la transmitancia térmica (W/m²K) a partir de la resistencia del material
  const result = 1 / (Rsi + resistenciaTermica + Rse)

  return result
}

export function calculateCoolingLoad(config: BuildingConfig) {

  const { areaMurosEste, areaMurosNorte, areaMurosOeste, areaMurosSur, areaVentanasEste, areaVentanasNorte, areaVentanasOeste, areaVentanasSur, ciudad, numPersonas, potenciaEquipos, potenciaLuces, temperaturaInterior, tipoMaterial } = config

  //Validaccion del clima
  const datosClima = climaDB[ciudad.toLowerCase()];

  if (!datosClima) {
    throw new Error(`No se encuentran los datos climaticos para la ciudad ${ciudad}`);
  }

  const material = materialesDB[tipoMaterial]

  if (!material) {
    throw new Error(`Material "${tipoMaterial}" no encontrado`);
  }

  const UValorMuros = calcularUValor(material.resistenciaTermica);

  const { cargaPorPersona, factorDeInfiltracion, factorSeguridad, factorSombreado, factorUVentana, factorGananciaSolarMuros, factorGananciaSolarVentanas } = DEFAULT_VALUES


  //  Áreas totales para transmisión
  const areaMurosTotal = areaMurosNorte + areaMurosSur + areaMurosEste + areaMurosOeste;
  const areaVentanasTotal = areaVentanasNorte + areaVentanasSur + areaVentanasEste + areaVentanasOeste;

  //  Carga por transmisión (NO depende de orientación)
  const deltaT = datosClima.tempDisenoVerano - temperaturaInterior
  const cargaTransmisionMuros = areaMurosTotal * UValorMuros * deltaT;
  const cargaTransmisionVentanas = areaVentanasTotal * factorUVentana * deltaT;

  //  Ganancia solar por muros (depende de orientación)

  const gananciaMurosNorte = areaMurosNorte * gananciaSolarPorOrientacionMuros.N * factorSombreado * factorGananciaSolarMuros;
  const gananciaMurosSur = areaMurosSur * gananciaSolarPorOrientacionMuros.S * factorSombreado * factorGananciaSolarMuros;
  const gananciaMurosEste = areaMurosEste * gananciaSolarPorOrientacionMuros.E * factorSombreado * factorGananciaSolarMuros;
  const gananciaMurosOeste = areaMurosOeste * gananciaSolarPorOrientacionMuros.O * factorSombreado * factorGananciaSolarMuros;

  const gananciaSolarMurosTotal = gananciaMurosEste + gananciaMurosNorte + gananciaMurosOeste + gananciaMurosSur;

  //  Ganancia solar por ventanas (depende de orientación)

  const gananciaVentanasNorte = areaVentanasNorte * gananciaSolarPorOrientacionVentanas.N * factorSombreado * factorGananciaSolarVentanas;
  const gananciaVentanasSur = areaVentanasSur * gananciaSolarPorOrientacionVentanas.S * factorSombreado * factorGananciaSolarVentanas;
  const gananciaVentanasEste = areaVentanasEste * gananciaSolarPorOrientacionVentanas.E * factorSombreado * factorGananciaSolarVentanas;
  const gananciaVentanasOeste = areaVentanasOeste * gananciaSolarPorOrientacionVentanas.O * factorSombreado * factorGananciaSolarVentanas;

  const gananciaSolarVentanasTotal = gananciaVentanasNorte + gananciaVentanasSur + gananciaVentanasEste + gananciaVentanasOeste;

  //  Total carga solar
  const cargaSolarTotal = gananciaSolarMurosTotal + gananciaSolarVentanasTotal;

  const cargaPersonas = numPersonas * cargaPorPersona;

  const cargaParcial = cargaTransmisionMuros + cargaTransmisionVentanas + cargaSolarTotal + cargaPersonas + potenciaLuces + potenciaEquipos;

  const cargaInfiltracion = cargaParcial * factorDeInfiltracion;

  const cargaTotal = cargaParcial + cargaInfiltracion;

  const totalFs = Math.ceil(cargaTotal * (1 + factorSeguridad))

  const Btu = Math.ceil(totalFs * 3.412)

  const TR = Btu / 12000

  return {
    watts: totalFs,
    btuH: Btu,
    TR: parseFloat(TR.toFixed(2)),
    desglose: {
      transmision: Math.ceil(cargaTransmisionMuros + cargaTransmisionVentanas),
      solar: Math.ceil(cargaSolarTotal),
      personas: Math.ceil(cargaPersonas),
      luces: potenciaLuces,
      equipos: potenciaEquipos,
      infiltracion: Math.ceil(cargaInfiltracion)
    },
    detalles: {
      uValor: parseFloat(UValorMuros.toFixed(3)),
      uVentana: factorUVentana,
      deltaT: parseFloat(deltaT.toFixed(1))
    }
  };
}

export function calculateHeatingLoad(config: BuildingConfig) {

  const { areaMurosEste, areaMurosNorte, areaMurosOeste, areaMurosSur, areaVentanasEste, areaVentanasNorte, areaVentanasOeste, areaVentanasSur, ciudad, numPersonas, potenciaEquipos, potenciaLuces, temperaturaInterior, tipoMaterial } = config

  //Validaccion del clima
  const datosClima = climaDB[ciudad.toLowerCase()];

  if (!datosClima) {
    throw new Error(`No se encuentran los datos climaticos para la ciudad ${ciudad}`);
  }

  const material = materialesDB[tipoMaterial]

  if (!material) {
    throw new Error(`Material "${tipoMaterial}" no encontrado`);
  }

  const UValorMuros = calcularUValor(material.resistenciaTermica);

  const { cargaPorPersona, factorDeInfiltracionInvierno, factorSeguridad, factorSombreadoInvierno, factorUVentana, factorGananciaSolarMuros, factorGananciaSolarVentanas } = DEFAULT_VALUES


  //  Áreas totales para transmisión
  const areaMurosTotal = areaMurosNorte + areaMurosSur + areaMurosEste + areaMurosOeste;
  const areaVentanasTotal = areaVentanasNorte + areaVentanasSur + areaVentanasEste + areaVentanasOeste;

  //  Carga por transmisión (NO depende de orientación)
  const deltaT = temperaturaInterior - datosClima.tempDisenoInvierno
  const cargaTransmisionMuros = areaMurosTotal * UValorMuros * deltaT;
  const cargaTransmisionVentanas = areaVentanasTotal * factorUVentana * deltaT;

  //  Ganancia solar por muros (depende de orientación)

  const gananciaMurosNorte = areaMurosNorte * gananciaSolarPorOrientacionMuros.N * factorSombreadoInvierno * factorGananciaSolarMuros;
  const gananciaMurosSur = areaMurosSur * gananciaSolarPorOrientacionMuros.S * factorSombreadoInvierno * factorGananciaSolarMuros;
  const gananciaMurosEste = areaMurosEste * gananciaSolarPorOrientacionMuros.E * factorSombreadoInvierno * factorGananciaSolarMuros;
  const gananciaMurosOeste = areaMurosOeste * gananciaSolarPorOrientacionMuros.O * factorSombreadoInvierno * factorGananciaSolarMuros;

  const gananciaSolarMurosTotal = gananciaMurosEste + gananciaMurosNorte + gananciaMurosOeste + gananciaMurosSur;

  //  Ganancia solar por ventanas (depende de orientación)

  const gananciaVentanasNorte = areaVentanasNorte * gananciaSolarPorOrientacionVentanas.N * factorSombreadoInvierno * factorGananciaSolarVentanas;
  const gananciaVentanasSur = areaVentanasSur * gananciaSolarPorOrientacionVentanas.S * factorSombreadoInvierno * factorGananciaSolarVentanas;
  const gananciaVentanasEste = areaVentanasEste * gananciaSolarPorOrientacionVentanas.E * factorSombreadoInvierno * factorGananciaSolarVentanas;
  const gananciaVentanasOeste = areaVentanasOeste * gananciaSolarPorOrientacionVentanas.O * factorSombreadoInvierno * factorGananciaSolarVentanas;

  const gananciaSolarVentanasTotal = gananciaVentanasNorte + gananciaVentanasSur + gananciaVentanasEste + gananciaVentanasOeste;

  //  Total carga solar
  const cargaSolarTotal = gananciaSolarMurosTotal + gananciaSolarVentanasTotal;

  const cargaPersonas = numPersonas * cargaPorPersona;

  const cargaParcial = cargaTransmisionMuros + cargaTransmisionVentanas - cargaSolarTotal + cargaPersonas + potenciaLuces + potenciaEquipos;

  const cargaInfiltracion = cargaParcial * factorDeInfiltracionInvierno;

  const cargaTotal = cargaParcial + cargaInfiltracion;

  const totalFs = Math.ceil(cargaTotal * (1 + factorSeguridad))

  const Btu = Math.ceil(totalFs * 3.412)
  const TR = Btu / 12000


  return {
    watts: totalFs,
    btuH: Btu,
    TR: parseFloat(TR.toFixed(2)),
    desglose: {
      transmision: Math.ceil(cargaTransmisionMuros + cargaTransmisionVentanas),
      solar: Math.ceil(cargaSolarTotal),
      personas: Math.ceil(cargaPersonas),
      luces: potenciaLuces,
      equipos: potenciaEquipos,
      infiltracion: Math.ceil(cargaInfiltracion)
    },
    detalles: {
      uValor: parseFloat(UValorMuros.toFixed(3)),
      uVentana: factorUVentana,
      deltaT: parseFloat(deltaT.toFixed(1))
    }
  };
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