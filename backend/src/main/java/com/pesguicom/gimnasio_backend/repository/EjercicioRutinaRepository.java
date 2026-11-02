package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.EjercicioRutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EjercicioRutinaRepository extends JpaRepository<EjercicioRutina, Long> {

    List<EjercicioRutina> findByRutinaIdOrderByOrdenAsc(Long rutinaId);
}