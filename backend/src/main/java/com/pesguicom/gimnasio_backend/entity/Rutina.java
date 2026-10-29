package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(nullable = false)
    private Integer series;

    @Column(nullable = false, length = 100)
    private String repeticiones;

    @Column(length = 500)
    private String observaciones;
}
