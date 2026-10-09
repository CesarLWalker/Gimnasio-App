package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.request.LiquidacionRequest;
import com.pesguicom.gimnasio_backend.dto.response.LiquidacionResponse;
import com.pesguicom.gimnasio_backend.service.LiquidacionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/liquidaciones")
public class LiquidacionController {

  private final LiquidacionService liquidacionService;

  public LiquidacionController(LiquidacionService liquidacionService) {
    this.liquidacionService = liquidacionService;
  }

  @GetMapping
  public ResponseEntity<List<LiquidacionResponse>> listar() {
    return ResponseEntity.ok(liquidacionService.listar());
  }

  @GetMapping("/{id}")
  public ResponseEntity<LiquidacionResponse> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(liquidacionService.buscarPorId(id));
  }

  @PostMapping
  public ResponseEntity<LiquidacionResponse> crear(@Valid @RequestBody LiquidacionRequest request) {
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(liquidacionService.crear(request));
  }

  @PutMapping("/{id}")
  public ResponseEntity<LiquidacionResponse> actualizar(
    @PathVariable Long id,
    @Valid @RequestBody LiquidacionRequest request
  ) {
    return ResponseEntity.ok(liquidacionService.actualizar(id, request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminar(@PathVariable Long id) {

    liquidacionService.eliminar(id);

    return ResponseEntity.noContent().build();
  }

}
