package com.pesguicom.gimnasio_backend.entity;

import com.pesguicom.gimnasio_backend.enums.Cuota;
import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import com.pesguicom.gimnasio_backend.enums.PeriodoPago;
import com.pesguicom.gimnasio_backend.enums.TipoPago;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter @Setter
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El celular es obligatorio")
    private String celular;

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    private EstadoCliente estado;

    @Enumerated(EnumType.STRING)
    private Cuota cuota;

    @Enumerated(EnumType.STRING)
    private TipoPago tipoPago;

    @Enumerated(EnumType.STRING)
    private PeriodoPago periodoPago;

    @NotNull(message = "El monto es obligatorio")
    @Positive(message = "El monto no puede ser negativo ni cero, debe ser mayor a 0")
    private Long monto;
    
    private LocalDate fechaUltimoPago;
}
