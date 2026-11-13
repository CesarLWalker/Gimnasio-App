package com.pesguicom.gimnasio_backend.dto.response;

import java.util.List;

public record DiaRutinaResponse(

        Long id,
        Integer numeroDia,
        String nombre,
        String grupoMuscular,
        List<EjercicioRutinaResponse> ejercicios
) {
}
