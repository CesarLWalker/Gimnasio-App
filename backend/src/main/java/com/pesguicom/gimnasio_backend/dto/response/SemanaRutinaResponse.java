package com.pesguicom.gimnasio_backend.dto.response;

import java.util.List;

public record SemanaRutinaResponse(

        Long id,
        Integer numeroSemana,
        List<DiaRutinaResponse> dias
) {
}
