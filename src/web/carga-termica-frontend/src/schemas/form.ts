import { z } from 'zod';

// Mensajes de validación reutilizables
const POSITIVE_NUMBER = "Debe ser mayor a 0";
const NONNEGATIVE_NUMBER = "No puede ser negativo";
const INTEGER_NUMBER = "Debe ser un número entero";

export const FormSchema = z.object({
  areaMuros: z
    .number()
    .positive(POSITIVE_NUMBER),

  areaVentanas: z
    .number()
    .nonnegative(NONNEGATIVE_NUMBER),

  numPersonas: z
    .number()
    .nonnegative(NONNEGATIVE_NUMBER)
    .int(INTEGER_NUMBER),

  potenciaLuces: z
    .number()
    .nonnegative(NONNEGATIVE_NUMBER),

  potenciaEquipos: z
    .number()
    .nonnegative(NONNEGATIVE_NUMBER),

  temperaturaInterior: z
    .number()
    .min(10, "La temperatura mínima es 10°C")
    .max(40, "La temperatura máxima es 40°C"),

  ciudad: z
    .string()
    .min(1, "Selecciona una ciudad"),

  tipoMaterial: z
    .string()
    .min(1, "Selecciona un material"),

  orientacion: z
    .enum(["N", "S", "E", "O"]),

  nombreProyecto: z
    .string()
    .max(255, "El nombre no puede exceder 255 caracteres")
    .optional()
});

export type FormData = z.infer<typeof FormSchema>;