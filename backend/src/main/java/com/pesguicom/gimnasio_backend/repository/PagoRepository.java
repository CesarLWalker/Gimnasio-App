package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

  // Con COALESCE decimos:
  //Si la suma es null, devolvé 0.
  @Query("SELECT COALESCE(SUM(p.monto), 0) FROM Pago p")
  Double sumarMontos();
}
