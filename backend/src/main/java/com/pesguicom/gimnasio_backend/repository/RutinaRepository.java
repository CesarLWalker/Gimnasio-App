package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long> {

    @Query("""
            SELECT DISTINCT r
            FROM Rutina r
            LEFT JOIN FETCH r.ejercicios
            """)
    List<Rutina> findAllWithEjercicios();

    @Query("""
            SELECT DISTINCT r
            FROM Rutina r
            LEFT JOIN FETCH r.ejercicios
            WHERE r.id = :id
            """)
    Optional<Rutina> findByIdWithEjercicios(@Param("id") Long id);
}
