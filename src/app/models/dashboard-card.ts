export interface DashboardCard {

  icono: string;
  titulo: string;
  valor: string;
  descripcion: string;
  color: string;
  seccion: 'clientes' | 'profesores' | 'finanzas';
  ruta?: string;
}