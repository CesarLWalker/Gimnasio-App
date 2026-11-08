package com.pesguicom.gimnasio_backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.List;

public record DiaRutinaRequest(

        @NotNull(message = "El número de día es obligatorio")
        @Min(value = 1) @Max(value = 7)
        Integer numeroDia,

        @NotBlank(message = "El nombre del día es obligatorio")
        @Size(max = 100)
        String nombre,

        @NotBlank(message = "El grupo muscular es obligatorio")
        @Size(max = 150)
        String grupoMuscular,

        @NotEmpty(message = "Agregá al menos un ejercicio")
        @Valid
        List<EjercicioRutinaRequest> ejercicios
) {
}
