package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.EjercicioRutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EjercicioRutinaRepository extends JpaRepository<EjercicioRutina, Long> {

}