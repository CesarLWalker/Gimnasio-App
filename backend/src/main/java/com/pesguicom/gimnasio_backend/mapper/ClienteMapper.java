package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.ClienteRequest;
import com.pesguicom.gimnasio_backend.dto.response.ClienteResponse;
import com.pesguicom.gimnasio_backend.entity.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    public Cliente toEntity(ClienteRequest request) {
        Cliente cliente = new Cliente();

        cliente.setNombre(request.nombre());
        cliente.setCelular(request.celular());
        cliente.setEstado(request.estado());
        cliente.setFechaUltimoPago(request.fechaUltimoPago());

        return cliente;
    }

    public ClienteResponse toResponse(Cliente cliente) {

        return new ClienteResponse(
                cliente.getId(),
                cliente.getNombre(),
                cliente.getCelular(),
                cliente.getEstado(),
                cliente.getFechaUltimoPago()
        );
    }
}
