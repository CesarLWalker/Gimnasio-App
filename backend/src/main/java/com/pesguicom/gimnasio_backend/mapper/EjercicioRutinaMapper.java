package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.EjercicioRutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.EjercicioRutinaResponse;
import com.pesguicom.gimnasio_backend.entity.EjercicioRutina;
import com.pesguicom.gimnasio_backend.entity.Rutina;
import org.springframework.stereotype.Component;

@Component
public class EjercicioRutinaMapper {

    public EjercicioRutina toEntity(EjercicioRutinaRequest request, Rutina rutina) {
        EjercicioRutina ejercicio = new EjercicioRutina();

        ejercicio.setNombre(request.nombre());
        ejercicio.setRepeticiones(request.repeticiones());
        ejercicio.setOrden(request.orden());
        ejercicio.setRutina(rutina);

        return ejercicio;
    }

    public EjercicioRutinaResponse toResponse(EjercicioRutina ejercicio) {
        return new EjercicioRutinaResponse(
                ejercicio.getId(),
                ejercicio.getNombre(),
                ejercicio.getRepeticiones(),
                ejercicio.getOrden()
        );
    }
}
