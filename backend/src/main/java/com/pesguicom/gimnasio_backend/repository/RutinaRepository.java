package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long> {
}
