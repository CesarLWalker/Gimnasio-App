package com.pesguicom.gimnasio_backend.dto.response;

import java.util.List;

public record RutinaResponse(

        Long id,
        String nombre,
        String descripcion,
        List<String> diasEntrenamiento,
        Integer diasPorSemana,
        List<EjercicioRutinaResponse> ejercicios
) {
}
