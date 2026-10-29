package com.pesguicom.gimnasio_backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RutinaRequest(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100)
        String nombre,

        @NotNull(message = "La cantidad de series es obligatoria")
        @Min(value = 1, message = "Debe haber al menos una serie")
        Integer series,

        @NotNull(message = "La cantidad de repeticiones es obligatoria")
        @Min(value = 1, message = "Debe haber al menos una repetición")
        @Size(max = 100)
        String repeticiones,

        @Size(max = 500)
        String observaciones
        ) {
}
