export interface HoraTrabajada {

  id: number;
  profesorId: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  horas: number;
  actividad: string;
  observacion?: string;
}