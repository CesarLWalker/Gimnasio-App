package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.DiaRutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.DiaRutinaResponse;
import com.pesguicom.gimnasio_backend.entity.DiaRutina;
import com.pesguicom.gimnasio_backend.entity.SemanaRutina;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DiaRutinaMapper {
    private final EjercicioRutinaMapper ejercicioMapper;

    public DiaRutinaMapper(EjercicioRutinaMapper ejercicioMapper) {
        this.ejercicioMapper = ejercicioMapper;
    }

    public DiaRutina toEntity(DiaRutinaRequest request, SemanaRutina semana) {
        DiaRutina dia = new DiaRutina();

        dia.setNumeroDia(request.numeroDia());
        dia.setNombre(request.nombre());
        dia.setGrupoMuscular(request.grupoMuscular());
        dia.setSemana(semana);
        dia.setEjercicios(new ArrayList<>());

        request.ejercicios().forEach(ejercicioRequest -> {
            dia.getEjercicios().add(ejercicioMapper.toEntity(ejercicioRequest, dia));
        });
        return dia;
    }

    public DiaRutinaResponse toResponse(DiaRutina dia) {

        return new DiaRutinaResponse(
                dia.getId(),
                dia.getNumeroDia(),
                dia.getNombre(),
                dia.getGrupoMuscular(),
                dia.getEjercicios()
                        .stream()
                        .map(ejercicioMapper::toResponse)
                        .toList()
        );
    }
}
