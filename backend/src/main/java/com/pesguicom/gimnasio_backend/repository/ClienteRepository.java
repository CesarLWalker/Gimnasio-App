package com.pesguicom.gimnasio_backend.repository;

import com.pesguicom.gimnasio_backend.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
