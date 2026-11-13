package com.pesguicom.gimnasio_backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SemanaRutinaRequest(

        @NotNull(message = "El número de semana es obligatorio")
        @Min(value = 1, message = "La semana de ser mayor que cero")
        Integer numeroSemana,

        @NotEmpty(message = "La semana debe tener al menos un día")
        @Valid
        List<DiaRutinaRequest> dias
) {
}
