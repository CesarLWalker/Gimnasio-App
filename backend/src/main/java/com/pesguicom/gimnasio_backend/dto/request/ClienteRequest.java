package com.pesguicom.gimnasio_backend.dto.request;

import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ClienteRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String nombre,
        @NotBlank(message = "El celular es obligatorio")
        String celular,
        @NotNull(message = "El estado es obligatorio")
        EstadoCliente estado,
        LocalDate fechaUltimoPago
) {
}
