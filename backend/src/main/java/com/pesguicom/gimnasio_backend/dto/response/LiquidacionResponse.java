package com.pesguicom.gimnasio_backend.dto.response;

import com.pesguicom.gimnasio_backend.enums.EstadoLiquidacion;

import java.time.LocalDate;

public record LiquidacionResponse(

  Long id,

  Long profesorId,

  String profesorNombre,

  LocalDate fechaLiquidacion,

  Double horasTrabajadas,

  Double monto,

  EstadoLiquidacion estadoLiquidacion
) {
}
