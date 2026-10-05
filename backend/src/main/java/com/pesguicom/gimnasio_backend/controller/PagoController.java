package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.request.PagoRequest;
import com.pesguicom.gimnasio_backend.dto.response.PagoResponse;
import com.pesguicom.gimnasio_backend.service.PagoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

  private final PagoService pagoService;

  public PagoController(PagoService pagoService) {
    this.pagoService = pagoService;
  }

  @PostMapping
  public ResponseEntity<PagoResponse> crear(@Valid @RequestBody PagoRequest request) {
    PagoResponse response = pagoService.crear(request);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(response);
  }

  @GetMapping
  public ResponseEntity<List<PagoResponse>> listar() {

    return ResponseEntity.ok(pagoService.listar());
  }

  @GetMapping("/{id}")
  public ResponseEntity<PagoResponse> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(pagoService.buscarPorId(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<PagoResponse> actualizar(@PathVariable Long id, @Valid @RequestBody PagoRequest request) {
    PagoResponse response = pagoService.actualizar(id, request);

    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminar(@PathVariable Long id) {
    pagoService.eliminar(id);
    return ResponseEntity.noContent().build();
  }
}
