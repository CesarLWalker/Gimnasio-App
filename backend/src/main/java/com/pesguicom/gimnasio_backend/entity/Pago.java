package com.pesguicom.gimnasio_backend.entity;

import com.pesguicom.gimnasio_backend.enums.TipoPago;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "pagos")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class Pago {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cliente_id", nullable = false)
  @NotNull(message = "El cliente es obligatorio")
  private Cliente cliente;

  @NotNull(message = "La fecha es obligatoria")
  private LocalDate fecha;

  @NotNull(message = "El monto es obligatorio")
  private Double monto;

  @Enumerated(EnumType.STRING)
  @NotNull(message = "El tipo de pago es obligatorio")
  private TipoPago tipoPago;
}
