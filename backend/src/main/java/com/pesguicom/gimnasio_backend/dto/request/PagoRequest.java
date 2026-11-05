package com.pesguicom.gimnasio_backend.dto.request;

import com.pesguicom.gimnasio_backend.enums.TipoPago;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record PagoRequest(

  @NotNull(message = "El cliente es obligatorio")
  Long clienteId,

  @NotNull(message = "La fecha es obligatoria")
  LocalDate fecha,

  @NotNull(message = "El monto es obligatorio")
  @Positive(message = "El monto debe ser mayor que cero")
  Double monto,

  @NotNull(message = "El tipo de pago es obligatorio")
  TipoPago tipoPago
) {
}
