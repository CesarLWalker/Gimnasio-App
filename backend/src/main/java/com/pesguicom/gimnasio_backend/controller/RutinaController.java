package com.pesguicom.gimnasio_backend.controller;

import com.pesguicom.gimnasio_backend.dto.request.RutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.RutinaResponse;
import com.pesguicom.gimnasio_backend.service.RutinaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rutinas")
public class RutinaController {

    private final RutinaService rutinaService;

    public RutinaController(RutinaService rutinaService) {
        this.rutinaService = rutinaService;
    }

    @GetMapping
    public List<RutinaResponse> listarTodas() {
        return rutinaService.listarTodas();
    }

    @GetMapping("/{id}")
    public RutinaResponse buscarPorId(@PathVariable Long id) {
        return rutinaService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RutinaResponse crear(@Valid @RequestBody RutinaRequest request) {
        return rutinaService.crear(request);
    }

    @PutMapping("/{id}")
    public RutinaResponse actualizar(@PathVariable Long id,
                                     @Valid @RequestBody RutinaRequest request) {
        return rutinaService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        rutinaService.eliminar(id);
    }
}
