import type { calculateLoads } from "../../../../core/rtsEngine";

interface ResultsDisplayProps {
  results: ReturnType<typeof calculateLoads>;
}

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const formatNumber = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <h2 className="mb-5 border-b border-slate-200 pb-3 text-xl font-bold text-slate-800">Resulado del Calculo</h2>
      <section className="mb-6 rounded-lg bg-sky-50/30 p-4">
        <label className="flex items-center gap-2 text-lg font-bold text-sky-700">❄️ Enfriamiento (Verano)</label>
        <p className="mt-3 text-3xl font-bold font-mono text-teal-700">watts: {formatNumber(results.cooling.watts)} </p>
        <p className="text-3xl font-bold font-mono text-teal-700">BTH/h: {formatNumber(results.cooling.btuH)}</p>
        <p className="text-3xl font-bold font-mono text-teal-700">Toneladas: {formatNumber(results.cooling.TR)} TR</p>

        <h3 className="mt-3 border-t border-sky-100 pt-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">Desglose</h3>
        <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2"> {/* contenedor layout */}
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Transmision: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.cooling.desglose.transmision)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga solar: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.cooling.desglose.solar)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga por persona: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.cooling.desglose.personas)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga iluminacion: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.cooling.desglose.luces)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga por Equipos: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.cooling.desglose.equipos)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga por infiltracion: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.cooling.desglose.infiltracion)} W/m²K</span></p>
        </div>
      </section>

      <div className="my-4 h-px bg-linear-to-r from-sky-400 to-orange-400" /> {/* contenedor layout */}

      <section className="mb-6 rounded-lg bg-orange-50/30 p-4">
        <label className="flex items-center gap-2 text-lg font-bold text-orange-700">🔥 Calefaccion (Invierno)</label>
        <p className="mt-3 text-3xl font-bold font-mono text-teal-700">watts: {formatNumber(results.heating.watts)} <span className="ml-1 text-sm font-normal text-slate-500">W/m²K</span></p>
        <p className="text-3xl font-bold font-mono text-teal-700">BTU/h: {formatNumber(results.heating.btuH)} <span className="ml-1 text-sm font-normal text-slate-500">W/m²K</span></p>
        <p className="text-3xl font-bold font-mono text-teal-700">Toneladas: {formatNumber(results.cooling.TR)} TR</p>

        <h3 className="mt-3 border-t border-orange-100 pt-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">Desglose</h3>
        <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2"> {/* contenedor layout */}
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Transmision: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.heating.desglose.transmision)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga solar: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.heating.desglose.solar)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga por persona: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.heating.desglose.personas)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga iluminacion: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.heating.desglose.luces)} W/m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga por Equipos: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.heating.desglose.equipos)} W /m²K</span></p>
          <p className="flex items-center justify-between gap-4 text-sm text-slate-600">Carga por infiltracion: <span className="font-mono font-semibold text-slate-800">{formatNumber(results.heating.desglose.infiltracion)} W/m²K</span></p>
        </div>
      </section>

      <section className="rounded-lg bg-slate-50 p-4">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-600 uppercase">📐 Detalles Tecnicos</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2"> {/* contenedor layout */}
          <p className="flex justify-between gap-3 text-xs text-slate-600">U-Valor:<span className="font-mono font-medium text-slate-800">{formatNumber(results.cooling.detalles.uValor)} W/m²K</span></p>
          <p className="flex justify-between gap-3 text-xs text-slate-600">ΔT enfriamiento: <span className="font-mono font-medium text-slate-800">{formatNumber(results.cooling.detalles.deltaT)} °C</span></p>
          <p className="flex justify-between gap-3 text-xs text-slate-600">ΔT calentamiento: <span className="font-mono font-medium text-slate-800">{formatNumber(results.heating.detalles.deltaT)} °C</span></p>
        </div>
      </section>
    </div>
  )
}

export default ResultsDisplay
