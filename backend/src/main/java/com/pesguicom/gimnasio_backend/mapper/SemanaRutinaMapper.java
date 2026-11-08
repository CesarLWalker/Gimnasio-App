package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.SemanaRutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.SemanaRutinaResponse;
import com.pesguicom.gimnasio_backend.entity.Rutina;
import com.pesguicom.gimnasio_backend.entity.SemanaRutina;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class SemanaRutinaMapper {
    private final DiaRutinaMapper diaMapper;

    public SemanaRutinaMapper(DiaRutinaMapper diaMapper) {
        this.diaMapper = diaMapper;
    }

    public SemanaRutina toEntity(SemanaRutinaRequest request, Rutina rutina) {
        SemanaRutina semana = new SemanaRutina();

        semana.setNumeroSemana(request.numeroSemana());
        semana.setRutina(rutina);
        semana.setDias(new ArrayList<>());

        request.dias().forEach(diaRequest -> {
            semana.getDias().add(diaMapper.toEntity(diaRequest, semana));
        });
        return semana;
    }

    public SemanaRutinaResponse toResponse(SemanaRutina semana) {

        return new SemanaRutinaResponse(
                semana.getId(),
                semana.getNumeroSemana(),
                semana.getDias()
                        .stream()
                        .map(diaMapper::toResponse)
                        .toList()
        );
    }
}
