package com.pesguicom.gimnasio_backend.dto.response;

public record DashboardResponse(

  long totalClientes,
  long totalProfesores,
  long totalLiquidaciones,
  long liquidacionesPendientes,
  long liquidacionesPagadas,
  long profesorActivo,
  long profesorInactivo,
  long clientesPagados,
  long clientesDeudores,
  double horasTotales,
  double recaudacionTotal
) {
}
