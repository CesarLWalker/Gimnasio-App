package com.pesguicom.gimnasio_backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EjercicioRutinaRequest(

        @NotBlank(message = "El nombre del ejercicio es obligatorio")
        @Size(max = 100)
        String nombre,

        @NotBlank(message = "Las repeticiones son obligatorias")
        @Size(max = 255)
        String repeticiones,

        @NotNull(message = "El orden es obligatorio")
        @Min(value = 1, message = "El orden debe ser mayor que cero")
        Integer orden
) {
}
