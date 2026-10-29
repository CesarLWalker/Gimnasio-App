package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.RutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.RutinaResponse;
import com.pesguicom.gimnasio_backend.entity.Rutina;
import org.springframework.stereotype.Component;

@Component
public class RutinaMapper {

    public Rutina toEntity(RutinaRequest request) {
        Rutina rutina = new Rutina();

        rutina.setNombre(request.nombre());
        rutina.setSeries(request.series());
        rutina.setRepeticiones(request.repeticiones());
        rutina.setObservaciones(request.observaciones());

        return rutina;
    }

    public RutinaResponse toResponse(Rutina rutina) {
        return new RutinaResponse(
                rutina.getId(),
                rutina.getNombre(),
                rutina.getSeries(),
                rutina.getRepeticiones(),
                rutina.getObservaciones()
        );
    }

    public void updateEntity(
            RutinaRequest request, Rutina rutina
    ) {
        rutina.setNombre(request.nombre());
        rutina.setSeries(request.series());
        rutina.setRepeticiones(request.repeticiones());
        rutina.setObservaciones(request.observaciones());
    }
}
