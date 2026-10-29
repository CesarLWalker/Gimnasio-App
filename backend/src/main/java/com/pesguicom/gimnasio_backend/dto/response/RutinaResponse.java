package com.pesguicom.gimnasio_backend.dto.response;

public record RutinaResponse(

        Long id,
        String nombre,
        Integer series,
        String repeticiones,
        String observaciones
) {
}
