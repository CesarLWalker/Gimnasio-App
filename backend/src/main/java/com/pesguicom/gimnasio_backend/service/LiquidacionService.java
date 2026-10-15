package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.LiquidacionRequest;
import com.pesguicom.gimnasio_backend.dto.response.LiquidacionResponse;
import com.pesguicom.gimnasio_backend.entity.Liquidacion;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.LiquidacionMapper;
import com.pesguicom.gimnasio_backend.repository.LiquidacionRepository;
import com.pesguicom.gimnasio_backend.repository.ProfesorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiquidacionService {

  private final LiquidacionRepository liquidacionRepository;
  private final ProfesorRepository profesorRepository;
  private final LiquidacionMapper liquidacionMapper;

  public LiquidacionService(
    LiquidacionRepository liquidacionRepository,
    ProfesorRepository profesorRepository,
    LiquidacionMapper liquidacionMapper
  ) {
    this.liquidacionRepository = liquidacionRepository;
    this.profesorRepository = profesorRepository;
    this.liquidacionMapper = liquidacionMapper;
  }

  public List<LiquidacionResponse> listar() {

    return liquidacionRepository.findAll()
      .stream()
      .map(liquidacionMapper::toResponse)
      .toList();
  }

  public LiquidacionResponse buscarPorId(Long id) {

    Liquidacion liquidacion = liquidacionRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Liquidación no encontrada"));

    return liquidacionMapper.toResponse(liquidacion);
  }

  public LiquidacionResponse crear(LiquidacionRequest request) {

    Profesor profesor = profesorRepository.findById(request.profesorId())
      .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado"));

    Liquidacion liquidacion = liquidacionMapper.toEntity(request, profesor);

    Liquidacion guardada = liquidacionRepository.save(liquidacion);

    return liquidacionMapper.toResponse(guardada);
  }

  public LiquidacionResponse actualizar(Long id, LiquidacionRequest request) {
    Liquidacion liquidacion = liquidacionRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Liquidación no encontrada"));

    Profesor profesor = profesorRepository.findById(request.profesorId())
      .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado"));

    liquidacion.setProfesor(profesor);
    liquidacion.setFechaLiquidacion(request.fechaLiquidacion());
    liquidacion.setHorasTrabajadas(request.horasTrabajadas());
    liquidacion.setMonto(request.monto());
    liquidacion.setEstadoLiquidacion(request.estadoLiquidacion());

    Liquidacion actualizada = liquidacionRepository.save(liquidacion);

    return liquidacionMapper.toResponse(actualizada);
  }

  public void eliminar(Long id) {

    if (!liquidacionRepository.existsById(id)) {
      throw new ResourceNotFoundException("Liquidación no encontrada");
    }

    liquidacionRepository.deleteById(id);
  }

}
