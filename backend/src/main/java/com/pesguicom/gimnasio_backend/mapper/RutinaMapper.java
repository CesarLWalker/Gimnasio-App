package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.RutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.RutinaResponse;
import com.pesguicom.gimnasio_backend.entity.Rutina;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class RutinaMapper {

    private final EjercicioRutinaMapper ejercicioMapper;

    public RutinaMapper(EjercicioRutinaMapper ejercicioMapper) {
        this.ejercicioMapper = ejercicioMapper;
    }

    public Rutina toEntity(RutinaRequest request) {
        Rutina rutina = new Rutina();

        rutina.setNombre(request.nombre());
        rutina.setDescripcion(request.descripcion());
        rutina.setDiasEntrenamiento(String.join(",", request.diasEntrenamiento()));
        rutina.setDiasPorSemana(request.diasPorSemana());
        rutina.setEjercicios(new ArrayList<>());

        request.ejercicios().forEach(ejercicio -> {rutina.getEjercicios().add(ejercicioMapper.toEntity(ejercicio, rutina));
        });

        return rutina;
    }

    public RutinaResponse toResponse(Rutina rutina) {

        List<String> dias = rutina.getDiasEntrenamiento() == null
                ? List.of()
                : Arrays.stream(rutina.getDiasEntrenamiento().split(","))
                .map(String::trim)
                .toList();

        return new RutinaResponse(
                rutina.getId(),
                rutina.getNombre(),
                rutina.getDescripcion(),
                dias,
                rutina.getDiasPorSemana(),
                rutina.getEjercicios()
                        .stream()
                        .map(ejercicioMapper::toResponse)
                        .toList()
        );
    }

    public void updateEntity(
            RutinaRequest request, Rutina rutina
    ) {
        rutina.setNombre(request.nombre());
        rutina.setDescripcion(request.descripcion());
        rutina.setDiasEntrenamiento(String.join(",", request.diasEntrenamiento()));
        rutina.setDiasPorSemana(request.diasPorSemana());
        rutina.getEjercicios().clear();
        request.ejercicios().forEach(ejercicio -> {
            rutina.getEjercicios().add(ejercicioMapper.toEntity(ejercicio, rutina));
        });
    }
}
