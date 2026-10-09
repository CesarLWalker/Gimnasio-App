package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.HoraTrabajada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HoraTrabajadaRepository extends JpaRepository<HoraTrabajada, Long> {

  @Query("SELECT COALESCE(SUM(h.horasTotales), 0) FROM HoraTrabajada h")
  Double sumarHorasTotales();
}
