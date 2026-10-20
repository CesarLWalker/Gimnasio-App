package com.pesguicom.gimnasio_backend.dto.request;

import com.pesguicom.gimnasio_backend.enums.Cuota;
import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import com.pesguicom.gimnasio_backend.enums.PeriodoPago;
import com.pesguicom.gimnasio_backend.enums.TipoPago;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record ClienteRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String nombre,
        @NotBlank(message = "El celular es obligatorio")
        String celular,
        @NotNull(message = "El estado es obligatorio")
        EstadoCliente estado,
        @NotNull(message = "La cuota es obligatoria")
        Cuota cuota,
        @NotNull(message = "El tipo de pago es obligatorio")
        TipoPago tipoPago,
        @NotNull(message = "El período de pago es obligatorio")
        PeriodoPago periodoPago,
        @NotNull(message = "El monto es obligatorio")
        @Positive(message = "El monto debe ser mayor a 0")
        Long monto,
        LocalDate fechaUltimoPago
) {
}
