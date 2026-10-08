package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.Cliente;
import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

  long countByEstado(EstadoCliente estado);
}
