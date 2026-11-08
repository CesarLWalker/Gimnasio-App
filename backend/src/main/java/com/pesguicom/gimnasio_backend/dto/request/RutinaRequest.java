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

        @NotEmpty(message = "La rutina debe tener al menos una semana")
        @Valid
        List<SemanaRutinaRequest> semanas

        ) {
}
