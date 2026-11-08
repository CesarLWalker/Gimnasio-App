package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.SemanaRutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemanaRutinaRepository extends JpaRepository<SemanaRutina, Long> {
}
