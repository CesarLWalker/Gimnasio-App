package com.pesguicom.gimnasio_backend.dto.response;

public record EjercicioRutinaResponse(
        Long id,
        String nombre,
        String repeticiones,
        Integer orden
) {
}
