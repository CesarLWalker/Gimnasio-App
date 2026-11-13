package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.DiaRutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaRutinaRepository extends JpaRepository<DiaRutina, Long> {
}
