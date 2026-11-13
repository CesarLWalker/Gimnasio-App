package com.pesguicom.gimnasio_backend.dto.response;

import com.pesguicom.gimnasio_backend.enums.EstadoProfesor;
import com.pesguicom.gimnasio_backend.enums.TipoRemuneracion;

public record ProfesorResponse(

  Long id,
  String nombre,
  String celular,
  String especialidad,
  Double sueldo,
  Double valorHora,
  TipoRemuneracion tipoRemuneracion,
  EstadoProfesor estadoProfesor,
  String icono,
  String color
) {
}
