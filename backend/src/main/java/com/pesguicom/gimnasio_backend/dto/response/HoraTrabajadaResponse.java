package com.pesguicom.gimnasio_backend.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

public record HoraTrabajadaResponse(

  Long id,

  Long profesorId,

  String profesorNombre,

  LocalDate fecha,

  LocalTime horaEntrada,

  LocalTime horaSalida,

  Double horasTotales
) {
}
