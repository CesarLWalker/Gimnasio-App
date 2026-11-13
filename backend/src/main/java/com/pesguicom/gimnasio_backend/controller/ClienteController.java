package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.request.ClienteRequest;
import com.pesguicom.gimnasio_backend.dto.response.ClienteResponse;
import com.pesguicom.gimnasio_backend.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponse>> listarClientes() {
        return ResponseEntity.ok(clienteService.listarClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Long id) {
        ClienteResponse cliente = clienteService.buscarPorId(id);

        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> guardarCliente(@Valid @RequestBody ClienteRequest clienteRequest) {
        return ResponseEntity.ok(clienteService.guardarCliente(clienteRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> actualizarCliente(@PathVariable Long id, @Valid @RequestBody ClienteRequest clienteRequest) {
        ClienteResponse clienteExistente = clienteService.buscarPorId(id);

        if (clienteExistente == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clienteService.actualizarCliente(id, clienteRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Long id) {
        ClienteResponse clienteExistente = clienteService.buscarPorId(id);

        if (clienteExistente == null) {
            return ResponseEntity.notFound().build();
        }

        clienteService.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}
