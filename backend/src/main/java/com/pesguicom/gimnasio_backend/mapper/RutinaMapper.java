package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.RutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.RutinaResponse;
import com.pesguicom.gimnasio_backend.entity.Rutina;
import com.pesguicom.gimnasio_backend.entity.SemanaRutina;
import com.pesguicom.gimnasio_backend.entity.Usuario;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class RutinaMapper {

    private final SemanaRutinaMapper semanaMapper;

    public RutinaMapper(SemanaRutinaMapper semanaMapper) {
        this.semanaMapper = semanaMapper;
    }

    public Rutina toEntity(RutinaRequest request, Usuario usuario) {
        Rutina rutina = new Rutina();

        rutina.setNombre(request.nombre());
        rutina.setDescripcion(request.descripcion());
        rutina.setActiva(true);
        rutina.setCreadoPor(usuario);
        rutina.setSemanas(new ArrayList<>());

        request.semanas().forEach(semanaRequest -> {
            SemanaRutina semana = semanaMapper.toEntity(semanaRequest, rutina);
            rutina.getSemanas().add(semana);
        });

        return rutina;
    }

    public RutinaResponse toResponse(Rutina rutina) {

        return new RutinaResponse(
                rutina.getId(),
                rutina.getNombre(),
                rutina.getDescripcion(),
                rutina.getActiva(),
                rutina.getSemanas()
                        .stream()
                        .map(semanaMapper::toResponse)
                        .toList()
        );
    }

    public void updateEntity(
            RutinaRequest request, Rutina rutina
    ) {
        rutina.setNombre(request.nombre());
        rutina.setDescripcion(request.descripcion());
        rutina.getSemanas().clear();
        request.semanas().forEach(semanaRequest -> {
            SemanaRutina semana = semanaMapper.toEntity(semanaRequest, rutina);
            rutina.getSemanas().add(semana);
        });
    }
}
