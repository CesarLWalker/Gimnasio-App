package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.request.RutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.RutinaResponse;
import com.pesguicom.gimnasio_backend.entity.Usuario;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.repository.UsuarioRepository;
import com.pesguicom.gimnasio_backend.service.RutinaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rutinas")
public class RutinaController {

    private final RutinaService rutinaService;
    private final UsuarioRepository usuarioRepository;

    public RutinaController(RutinaService rutinaService, UsuarioRepository usuarioRepository) {
        this.rutinaService = rutinaService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public ResponseEntity<List<RutinaResponse>> listarTodas() {
        return ResponseEntity.ok(rutinaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RutinaResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(rutinaService.buscarPorId(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<RutinaResponse> crear(@Valid @RequestBody RutinaRequest request,
                                                Authentication authentication) {
        String username = authentication.getName();

        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(() ->
                new ResourceNotFoundException("No se encontró el usuario: " + username));

        RutinaResponse response = rutinaService.crear(request, usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RutinaResponse> actualizar(@PathVariable Long id,
                                     @Valid @RequestBody RutinaRequest request) {
        return ResponseEntity.ok(rutinaService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        rutinaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
