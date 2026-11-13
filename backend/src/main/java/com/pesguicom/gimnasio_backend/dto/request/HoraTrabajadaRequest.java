package com.pesguicom.gimnasio_backend.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record HoraTrabajadaRequest(

  @NotNull(message = "El profesor es obligatorio")
  Long profesorId,

  @NotNull(message = "La fecha es obligatoria")
  LocalDate fecha,

  @NotNull(message = "La hora de entrada es obligatoria")
  LocalTime horaEntrada,

  @NotNull(message = "La hora de salida es obligatoria")
  LocalTime horaSalida
) {
}
