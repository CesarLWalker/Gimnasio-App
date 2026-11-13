package com.pesguicom.gimnasio_backend.dto.response;

import com.pesguicom.gimnasio_backend.enums.Cuota;
import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import com.pesguicom.gimnasio_backend.enums.PeriodoPago;
import com.pesguicom.gimnasio_backend.enums.TipoPago;

import java.time.LocalDate;

public record ClienteResponse(

  Long id,
  String nombre,
  String celular,
  EstadoCliente estado,
  LocalDate fechaUltimoPago,
  Cuota cuota,
  TipoPago tipoPago,
  PeriodoPago periodoPago,
  Long monto
) {
}
