package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.ProfesorRequest;
import com.pesguicom.gimnasio_backend.dto.response.ProfesorResponse;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import org.springframework.stereotype.Component;

@Component
public class ProfesorMapper {

  public Profesor toEntity(ProfesorRequest request) {
    Profesor profesor = new Profesor();

    profesor.setNombre(request.nombre());
    profesor.setCelular(request.celular());
    profesor.setEspecialidad(request.especialidad());
    profesor.setSueldo(request.sueldo());
    profesor.setValorHora(request.valorHora());
    profesor.setTipoRemuneracion(request.tipoRemuneracion());
    profesor.setEstadoProfesor(request.estadoProfesor());
    profesor.setIcono(request.icono());
    profesor.setColor(request.color());

    return profesor;
  }

  public ProfesorResponse toResponse(Profesor profesor) {

    return new ProfesorResponse(
      profesor.getId(),
      profesor.getNombre(),
      profesor.getCelular(),
      profesor.getEspecialidad(),
      profesor.getSueldo(),
      profesor.getValorHora(),
      profesor.getTipoRemuneracion(),
      profesor.getEstadoProfesor(),
      profesor.getIcono(),
      profesor.getColor()
    );
  }

  public void updateEntity(Profesor profesor, ProfesorRequest request) {

    profesor.setNombre(request.nombre());
    profesor.setCelular(request.celular());
    profesor.setEspecialidad(request.especialidad());
    profesor.setSueldo(request.sueldo());
    profesor.setValorHora(request.valorHora());
    profesor.setTipoRemuneracion(request.tipoRemuneracion());
    profesor.setEstadoProfesor(request.estadoProfesor());
    profesor.setIcono(request.icono());
    profesor.setColor(request.color());
  }

}
