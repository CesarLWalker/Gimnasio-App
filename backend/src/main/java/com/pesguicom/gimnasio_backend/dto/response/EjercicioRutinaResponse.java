package com.pesguicom.gimnasio_backend.dto.response;

public record EjercicioRutinaResponse(
        Long id,
        String nombre,
        Integer series,
        String repeticiones,
        Integer orden
) {
}
