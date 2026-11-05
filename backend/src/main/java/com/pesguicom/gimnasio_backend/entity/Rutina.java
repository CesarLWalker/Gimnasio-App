package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rutinas")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class Rutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 500)
    private String descripcion;

    @Column(length = 500)
    private String diasEntrenamiento;

    @Column(nullable = false)
    private Integer diasPorSemana;

    @OneToMany(mappedBy = "rutina", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<EjercicioRutina> ejercicios = new ArrayList<>();
}
