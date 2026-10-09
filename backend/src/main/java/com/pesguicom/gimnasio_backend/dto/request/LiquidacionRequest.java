package com.pesguicom.gimnasio_backend.dto.request;

import com.pesguicom.gimnasio_backend.enums.EstadoLiquidacion;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record LiquidacionRequest(

  @NotNull(message = "El profesor es obligatorio")
  Long profesorId,

  @NotNull(message = "La fecha de liquidación es obligatoria")
  LocalDate fechaLiquidacion,

  @NotNull(message = "Las horas trabajadas son obligatorias")
  Double horasTrabajadas,

  @NotNull(message = "El monto es obligatorio")
  Double monto,

  @NotNull(message = "El estado es obligatorio")
  EstadoLiquidacion estadoLiquidacion
) {
}
