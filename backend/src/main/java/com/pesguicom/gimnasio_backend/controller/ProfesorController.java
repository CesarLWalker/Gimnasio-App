package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.request.ProfesorRequest;
import com.pesguicom.gimnasio_backend.dto.response.ProfesorResponse;
import com.pesguicom.gimnasio_backend.service.ProfesorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

  private final ProfesorService profesorService;

  public ProfesorController(ProfesorService profesorService) {
    this.profesorService = profesorService;
  }

  @PostMapping
  public ResponseEntity<ProfesorResponse> crear(@Valid @RequestBody ProfesorRequest request) {
    ProfesorResponse response = profesorService.crear(request);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(response);
  }

  @GetMapping
  public ResponseEntity<List<ProfesorResponse>> listar() {
    return ResponseEntity.ok(profesorService.listar());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProfesorResponse> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(profesorService.buscarPorId(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProfesorResponse> actualizar(@PathVariable Long id,
                                                     @Valid @RequestBody ProfesorRequest request) {

    return ResponseEntity.ok(profesorService.actualizar(id, request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminar(@PathVariable Long id) {
    profesorService.eliminar(id);
    return ResponseEntity.noContent().build();
  }

}
