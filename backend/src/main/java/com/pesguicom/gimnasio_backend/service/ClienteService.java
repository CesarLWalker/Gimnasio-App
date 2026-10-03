package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.ClienteRequest;
import com.pesguicom.gimnasio_backend.dto.response.ClienteResponse;
import com.pesguicom.gimnasio_backend.entity.Cliente;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.ClienteMapper;
import com.pesguicom.gimnasio_backend.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    // inyección de dependencias por constructor
    public ClienteService(ClienteRepository clienteRepository, ClienteMapper clienteMapper) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
    }

    public List<ClienteResponse> listarClientes() {
        return clienteRepository.findAll()
                .stream()
                .map(clienteMapper::toResponse)
                .toList();
    }

    public ClienteResponse buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .map(clienteMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente con id " + id + " no encontrado"));
    }

    public ClienteResponse guardarCliente(ClienteRequest clienteRequest) {
        Cliente cliente = clienteMapper.toEntity(clienteRequest);
        Cliente clienteGuardado = clienteRepository.save(cliente);
        return clienteMapper.toResponse(clienteGuardado);
    }

    public ClienteResponse actualizarCliente(Long id, ClienteRequest clienteRequest) {
        Cliente clienteExistente = clienteRepository.findById(id).orElse(null);

        if (clienteExistente == null) {
            return null;
        }

        clienteExistente.setNombre(clienteRequest.nombre());
        clienteExistente.setCelular(clienteRequest.celular());
        clienteExistente.setCelular(clienteRequest.celular());
        clienteExistente.setEstado(clienteRequest.estado());
        clienteExistente.setFechaUltimoPago(clienteRequest.fechaUltimoPago());

        Cliente clienteActualizado = clienteRepository.save(clienteExistente);
        return clienteMapper.toResponse(clienteActualizado);
    }

    public void eliminarCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
