package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.request.HoraTrabajadaRequest;
import com.pesguicom.gimnasio_backend.dto.response.HoraTrabajadaResponse;
import com.pesguicom.gimnasio_backend.service.HoraTrabajadaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horas-trabajadas")
public class HoraTrabajadaController {

  private final HoraTrabajadaService horaTrabajadaService;

  public HoraTrabajadaController(HoraTrabajadaService horaTrabajadaService) {
    this.horaTrabajadaService = horaTrabajadaService;
  }

  @PostMapping
  public ResponseEntity<HoraTrabajadaResponse> crear(@Valid @RequestBody HoraTrabajadaRequest request) {

    HoraTrabajadaResponse response = horaTrabajadaService.crear(request);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(response);
  }

  @GetMapping
  public ResponseEntity<List<HoraTrabajadaResponse>> listar() {
    return ResponseEntity.ok(horaTrabajadaService.listar());
  }

  @GetMapping("/{id}")
  public ResponseEntity<HoraTrabajadaResponse> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(horaTrabajadaService.buscarPorId(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminar(@PathVariable Long id) {
    horaTrabajadaService.eliminar(id);
    return ResponseEntity.noContent().build();
  }

}
