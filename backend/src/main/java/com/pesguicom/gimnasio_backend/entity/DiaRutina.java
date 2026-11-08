package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dias_rutina", uniqueConstraints = {@UniqueConstraint(columnNames = {"semana_id", "numero_dia"})})
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class DiaRutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_dia", nullable = false)
    private Integer numeroDia;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(name = "grupo_muscular", length = 150)
    private String grupoMuscular;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semana_id", nullable = false)
    private SemanaRutina semana;

    @OneToMany(mappedBy = "dia", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orden ASC")
    @Builder.Default
    private List<EjercicioRutina> ejercicios = new ArrayList<>();
}
