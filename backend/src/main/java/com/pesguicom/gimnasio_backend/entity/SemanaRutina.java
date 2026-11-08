package com.pesguicom.gimnasio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "semanas_rutina", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"rutina_id", "numero_semana"})
})
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class SemanaRutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_semana", nullable = false)
    private Integer numeroSemana;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rutina_id", nullable = false)
    private Rutina rutina;

    @OneToMany(mappedBy = "semana", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("numeroDia ASC")
    @Builder.Default
    private List<DiaRutina> dias = new ArrayList<>();
}
