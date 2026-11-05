package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ejercicios")
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

    @Column(nullable = false, length = 255)
    private String repeticiones;

    @Column(nullable = false)
    private Integer orden;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rutina_id", nullable = false)
    private Rutina rutina;
}
