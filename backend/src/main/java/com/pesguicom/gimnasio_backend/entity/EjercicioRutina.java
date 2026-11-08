package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ejercicios_rutina")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class EjercicioRutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false)
    private Integer series;

    @Column(length = 100)
    private String repeticiones;

    @Column(nullable = false)
    private Integer orden;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dia_id", nullable = false)
    private DiaRutina dia;
}
