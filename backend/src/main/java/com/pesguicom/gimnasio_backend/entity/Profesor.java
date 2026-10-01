package com.pesguicom.gimnasio_backend.entity;

import com.pesguicom.gimnasio_backend.enums.EstadoProfesor;
import com.pesguicom.gimnasio_backend.enums.TipoRemuneracion;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class Profesor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String icono;

  @NotBlank(message = "El nombre es obligatorio")
  private String nombre;

  @NotBlank(message = "El celular es obligatorio")
  private String celular;

  private String especialidad;

  private Long sueldo;

  private Long valorHora;

  @Enumerated(EnumType.STRING)
  private TipoRemuneracion tipoRemuneracion;

  @Enumerated(EnumType.STRING)
  @NotNull(message = "El estado es obligatorio")
  private EstadoProfesor estadoProfesor;

  private String color;
}
