package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.Profesor;
import com.pesguicom.gimnasio_backend.enums.EstadoProfesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

  long countByEstado(EstadoProfesor estado);
}
