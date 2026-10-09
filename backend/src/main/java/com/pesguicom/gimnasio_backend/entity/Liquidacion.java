package com.pesguicom.gimnasio_backend.entity;

import com.pesguicom.gimnasio_backend.enums.EstadoLiquidacion;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "liquidaciones")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class Liquidacion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "profesor_id", nullable = false)
  @NotNull(message = "El profesor es obligatorio")
  private Profesor profesor;

  @NotNull(message = "La fecha de liquidación es obligatoria")
  private LocalDate fechaLiquidacion;

  @NotNull(message = "Las horas trabajadas son obligatorias")
  private Double horasTrabajadas;

  @NotNull(message = "el monto a pagar es obligatorio")
  private Double monto;

  @Enumerated(EnumType.STRING)
  @NotNull(message = "El estado es obligatorio")
  private EstadoLiquidacion estadoLiquidacion;
}
