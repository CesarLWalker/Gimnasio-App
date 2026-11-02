package com.pesguicom.gimnasio_backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.List;

public record RutinaRequest(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100)
        String nombre,

        @Size(max = 500)
        String descripcion,

        @NotEmpty(message = "Seleccioná al menos un día de entrenamiento")
        List<String> diasEntrenamiento,

        @NotNull(message = "La cantidad de días es obligatoria")
        @Min(value = 1, message = "Debe haber al menos un día")
        @Max(value = 7, message = "No puede superar los siete días")
        Integer diasPorSemana,

        @NotNull(message = "Los ejercicios son obligatorios")
        @Valid
        List<EjercicioRutinaRequest> ejercicios

        ) {
}
