import { climaDB, materialesDB } from '../../../../core/database'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schemas/form";
import type { FormData } from "../schemas/form";


interface InputFormProps {
  onSubmit: (data: FormData) => void
}

export const InputForm = ({ onSubmit }: InputFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      areaMurosNorte: 40,
      areaMurosSur: 40,
      areaMurosEste: 35,
      areaMurosOeste: 35,
      areaVentanasNorte: 8,
      areaVentanasSur: 10,
      areaVentanasEste: 6,
      areaVentanasOeste: 6,
      numPersonas: 10,
      potenciaLuces: 800,
      potenciaEquipos: 2000,
      temperaturaInterior: 24,
      ciudad: "madrid",
      tipoMaterial: "ladrilloHueco",
      orientacion: "S",
      nombreProyecto: ""
    }
  })

  const ciudades = Object.keys(climaDB);
  const material = Object.keys(materialesDB)

  return (
    <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md" onSubmit={handleSubmit(onSubmit)}>

      <label className="block text-sm font-semibold text-slate-700">Nombre del Proyecto</label>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="text" {...register("nombreProyecto")} />

      <label className="block text-sm font-semibold text-slate-700" htmlFor="busqueda">Busca o escribe</label>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="text" list="opciones" id="busqueda" placeholder="Escribe o selecciona una ciudad" {...register("ciudad")} />
      <datalist className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" id="opciones"  >
        {ciudades.map((v) => (
          <option value={v} key={v} >
            {climaDB[v].nombre}
          </option>
        ))}
      </datalist>

      {/* Ahora - Muros por orientación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">Muros - Norte (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaMurosNorte", { valueAsNumber: true })} />
          {errors.areaMurosNorte && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaMurosNorte.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Muros - Sur (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaMurosSur", { valueAsNumber: true })} />
          {errors.areaMurosSur && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaMurosSur.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Muros - Este (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaMurosEste", { valueAsNumber: true })} />
          {errors.areaMurosEste && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaMurosEste.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Muros - Oeste (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaMurosOeste", { valueAsNumber: true })} />
          {errors.areaMurosOeste && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaMurosOeste.message}</span>}
        </div>
      </div>

      {/* Ventanas por orientación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">Ventanas - Norte (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaVentanasNorte", { valueAsNumber: true })} />
          {errors.areaVentanasNorte && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaVentanasNorte.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Ventanas - Sur (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaVentanasSur", { valueAsNumber: true })} />
          {errors.areaVentanasSur && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaVentanasSur.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Ventanas - Este (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaVentanasEste", { valueAsNumber: true })} />
          {errors.areaVentanasEste && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaVentanasEste.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Ventanas - Oeste (m²)</label>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("areaVentanasOeste", { valueAsNumber: true })} />
          {errors.areaVentanasOeste && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.areaVentanasOeste.message}</span>}
        </div>
      </div>

      <label className="block text-sm font-semibold text-slate-700">Numero de Personas</label>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("numPersonas", { valueAsNumber: true })} />
      {errors.numPersonas && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.numPersonas.message}</span>}

      <label className="block text-sm font-semibold text-slate-700">Potencia de iluminacion (Watts)</label>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("potenciaLuces", { valueAsNumber: true })} />
      {errors.potenciaLuces && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.potenciaLuces.message}</span>}

      <label className="block text-sm font-semibold text-slate-700">Potencia de equipos (watts)</label>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("potenciaEquipos", { valueAsNumber: true })} />
      {errors.potenciaEquipos && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.potenciaEquipos.message}</span>}

      <label className="block text-sm font-semibold text-slate-700">Temperatura interior</label>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="number" {...register("temperaturaInterior", { valueAsNumber: true })} />
      {errors.temperaturaInterior && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.temperaturaInterior.message}</span>}


      <label className="block text-sm font-semibold text-slate-700" htmlFor='buscar'>Tipo de Material</label>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" type="text" list="option" id="buscar" placeholder="Escribe o selecciona un material" {...register("tipoMaterial")} />
      <datalist className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" id="option" >
        {material.map((v) => (
          <option value={v} key={v} >
            {materialesDB[v].nombre}
          </option>
        ))}
      </datalist>
      {errors.tipoMaterial && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.tipoMaterial.message}</span>}


      <label className="block text-sm font-semibold text-slate-700">Orientacion</label>
      <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none" {...register("orientacion")}>
        <option value="N">N</option>
        <option value="S">S</option>
        <option value="E">E</option>
        <option value="O">O</option>
      </select>
      {errors.orientacion && <span className='mt-1 flex items-center gap-1 text-sm text-red-600'>⚠️ {errors.orientacion.message}</span>}
      <button className="mt-6 w-full rounded-lg bg-gradient-to-r from-sky-600 to-sky-700 py-3 font-bold text-white shadow-md transition-all hover:from-sky-700 hover:to-sky-800 hover:shadow-lg" type='submit'>✅ Calcular</button>
    </form>
  )
}
