package com.pesguicom.gimnasio_backend.dto.request;

import com.pesguicom.gimnasio_backend.enums.EstadoProfesor;
import com.pesguicom.gimnasio_backend.enums.TipoRemuneracion;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ProfesorRequest(

  @NotBlank(message = "El nombre es obligatorio")
  String nombre,

  @NotBlank(message = "El celular es obligatorio")
  String celular,

  @NotBlank(message = "La especialidad es obligatoria")
  String especialidad,

  @PositiveOrZero(message = "El sueldo no puede ser negativo")
  Double sueldo,

  @PositiveOrZero(message = "El valor por hora no puede ser negativo")
  Double valorHora,

  @NotNull(message = "El tipo de remuneración es obligatorio")
  TipoRemuneracion tipoRemuneracion,

  @NotNull(message = "El estado es obligatorio")
  EstadoProfesor estadoProfesor,

  String icono,
  String color
) {
}
