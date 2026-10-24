package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "horas_trabajadas")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class HoraTrabajada {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "profesor_id", nullable = false)
  @NotNull(message = "El profesor es obligatorio")
  private Profesor profesor;

  @NotNull(message = "La fecha es obligatoria")
  private LocalDate fecha;

  @NotNull(message = "La hora de entrada es obligatoria")
  private LocalTime horaEntrada;

  @NotNull(message = "La hora de salida es obligatoria")
  private LocalTime horaSalida;

  @NotNull(message = "Las horas totales son obligatorias")
  private Double horasTotales;
}
