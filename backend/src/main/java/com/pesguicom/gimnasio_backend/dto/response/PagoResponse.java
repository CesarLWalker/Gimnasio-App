package com.pesguicom.gimnasio_backend.dto.response;

import com.pesguicom.gimnasio_backend.enums.TipoPago;

import java.time.LocalDate;

public record PagoResponse(

  Long id,

  Long clienteId,

  String clienteNombre,

  LocalDate fecha,

  Double monto,

  TipoPago tipoPago
) {
}
