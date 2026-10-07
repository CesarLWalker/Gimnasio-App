package com.pesguicom.gimnasio_backend.dto.response;

public record DashboardResponse(

  long totalClientes,
  long clientesPagados,
  long clientesDeudores,
  long totalProfesores,
  double totalHorasTrabajadas,
  long totalLiquidaciones,
  long liquidacionesPendientes,
  long liquidacionesPagadas,
  double recaudacionTotal
) {
}
