package com.pesguicom.gimnasio_backend.dto.request;

import jakarta.validation.constraints.*;

public record EjercicioRutinaRequest(

        @NotBlank(message = "El nombre del ejercicio es obligatorio")
        @Size(max = 100)
        String nombre,

        @NotNull(message = "Las series son obligatorias")
        @Min(value = 1, message = "Debe haber al menos una serie")
        @Max(value = 20, message = "No puede superar las veinte series")
        Integer series,

        @NotBlank(message = "Las repeticiones son obligatorias")
        @Size(max = 255)
        String repeticiones,

        @NotNull(message = "El orden es obligatorio")
        @Min(value = 1, message = "El orden debe ser mayor que cero")
        Integer orden
) {
}
