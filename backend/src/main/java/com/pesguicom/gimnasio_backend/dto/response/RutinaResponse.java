package com.pesguicom.gimnasio_backend.dto.response;

import java.util.List;

public record RutinaResponse(

        Long id,
        String nombre,
        String descripcion,
        Boolean activa,
        List<SemanaRutinaResponse> semanas
) {
}
