package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.EjercicioRutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.EjercicioRutinaResponse;
import com.pesguicom.gimnasio_backend.entity.DiaRutina;
import com.pesguicom.gimnasio_backend.entity.EjercicioRutina;
import org.springframework.stereotype.Component;

@Component
public class EjercicioRutinaMapper {

    public EjercicioRutina toEntity(EjercicioRutinaRequest request, DiaRutina dia) {
        EjercicioRutina ejercicio = new EjercicioRutina();

        ejercicio.setNombre(request.nombre());
        ejercicio.setSeries(request.series());
        ejercicio.setRepeticiones(request.repeticiones());
        ejercicio.setOrden(request.orden());
        ejercicio.setDia(dia);

        return ejercicio;
    }

    public EjercicioRutinaResponse toResponse(EjercicioRutina ejercicio) {
        return new EjercicioRutinaResponse(
                ejercicio.getId(),
                ejercicio.getNombre(),
                ejercicio.getSeries(),
                ejercicio.getRepeticiones(),
                ejercicio.getOrden()
        );
    }
}
