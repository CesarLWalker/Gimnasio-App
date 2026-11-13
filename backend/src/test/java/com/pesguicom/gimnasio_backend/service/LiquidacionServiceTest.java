package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.LiquidacionRequest;
import com.pesguicom.gimnasio_backend.dto.response.LiquidacionResponse;
import com.pesguicom.gimnasio_backend.entity.Liquidacion;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.LiquidacionMapper;
import com.pesguicom.gimnasio_backend.repository.HoraTrabajadaRepository;
import com.pesguicom.gimnasio_backend.repository.LiquidacionRepository;
import com.pesguicom.gimnasio_backend.repository.ProfesorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LiquidacionServiceTest {

  @Mock
  private LiquidacionRepository liquidacionRepository;

  @Mock
  private ProfesorRepository profesorRepository;

  @Mock
  private LiquidacionMapper liquidacionMapper;

  @InjectMocks
  private LiquidacionService liquidacionService;

  @BeforeEach
  void setUp() {}

  @Test
  void listar_DebeRetornarListaLiquidaciones() {
    // Arrange
    Liquidacion liquidacion = new Liquidacion();
    LiquidacionResponse response = mock(LiquidacionResponse.class);

    when(liquidacionRepository.findAll()).thenReturn(List.of(liquidacion));
    when(liquidacionMapper.toResponse(liquidacion)).thenReturn(response);

    // Act
    List<LiquidacionResponse> resultado = liquidacionService.listar();

    // Assert
    assertEquals(1, resultado.size());
    assertSame(response, resultado.getFirst());

    verify(liquidacionRepository).findAll();
    verify(liquidacionMapper).toResponse(liquidacion);
  }

  @Test
  void buscarPorId_DebeRetornarLiquidacion() {
    // Arrange
    Long id = 1L;

    Liquidacion liquidacion = new Liquidacion();
    LiquidacionResponse response = mock(LiquidacionResponse.class);

    when(liquidacionRepository.findById(id)).thenReturn(Optional.of(liquidacion));
    when(liquidacionMapper.toResponse(liquidacion)).thenReturn(response);

    // Act
    LiquidacionResponse resultado = liquidacionService.buscarPorId(id);

    // Assert
    assertSame(response, resultado);

    verify(liquidacionRepository).findById(id);
    verify(liquidacionMapper).toResponse(liquidacion);
  }

  @Test
  void buscarPorId_DebeLanzarExcepcion_CuandoNoExiste() {
    // Arrange
    Long id = 999L;

    when(liquidacionRepository.findById(id)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> liquidacionService.buscarPorId(id)
    );

    verify(liquidacionRepository).findById(id);
    verifyNoInteractions(liquidacionMapper);
  }

  @Test
  void crear_DebeGuardarYRetornarLiquidacion() {
    // Arrange
    Long profesorId = 1L;

    LiquidacionRequest request = mock(LiquidacionRequest.class);
    Profesor profesor = new Profesor();
    Liquidacion liquidacion = new Liquidacion();
    LiquidacionResponse response = mock(LiquidacionResponse.class);

    when(request.profesorId()).thenReturn(profesorId);
    when(profesorRepository.findById(profesorId)).thenReturn(Optional.of(profesor));
    when(liquidacionMapper.toEntity(request, profesor)).thenReturn(liquidacion);
    when(liquidacionRepository.save(liquidacion)).thenReturn(liquidacion);
    when(liquidacionMapper.toResponse(liquidacion)).thenReturn(response);

    // Act
    LiquidacionResponse resultado = liquidacionService.crear(request);

    // Assert
    assertSame(response, resultado);

    verify(profesorRepository).findById(profesorId);
    verify(liquidacionMapper).toEntity(request, profesor);
    verify(liquidacionRepository).save(liquidacion);
    verify(liquidacionMapper).toResponse(liquidacion);
  }

  @Test
  void crear_DebeLanzarExcepcion_CuandoProfesorNoExiste() {
    // Arrange
    Long profesorId = 999L;

    LiquidacionRequest request = mock(LiquidacionRequest.class);

    when(request.profesorId()).thenReturn(profesorId);
    when(profesorRepository.findById(profesorId)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> liquidacionService.crear(request)
    );

    verify(profesorRepository).findById(profesorId);
    verifyNoInteractions(liquidacionMapper);
    verifyNoInteractions(liquidacionRepository);
  }

  @Test
  void actualizar_DebeActualizarRetornarLiquidacion() {
    // Arrange
    Long id = 1L;
    Long profesorId = 2L;

    LiquidacionRequest request = mock(LiquidacionRequest.class);
    Liquidacion liquidacion = mock(Liquidacion.class);
    Profesor profesor = new Profesor();
    LiquidacionResponse response = mock(LiquidacionResponse.class);

    when(liquidacionRepository.findById(id)).thenReturn(Optional.of(liquidacion));
    when(request.profesorId()).thenReturn(profesorId);
    when(profesorRepository.findById(profesorId)).thenReturn(Optional.of(profesor));
    when(liquidacionRepository.save(liquidacion)).thenReturn(liquidacion);
    when(liquidacionMapper.toResponse(liquidacion)).thenReturn(response);

    // Act
    LiquidacionResponse resultado = liquidacionService.actualizar(id, request);

    // Assert
    assertSame(response, resultado);

    verify(liquidacion).setProfesor(profesor);
    verify(liquidacion).setFechaLiquidacion(request.fechaLiquidacion());
    verify(liquidacion).setHorasTrabajadas(request.horasTrabajadas());
    verify(liquidacion).setMonto(request.monto());
    verify(liquidacion).setEstadoLiquidacion(request.estadoLiquidacion());

    verify(liquidacionRepository).save(liquidacion);
    verify(liquidacionMapper).toResponse(liquidacion);
  }

  @Test
  void actualizar_DebeLanzarExcepcion_CuandoLiquidacionNoExiste() {
    // Arrange
    Long id = 999L;

    LiquidacionRequest request = mock(LiquidacionRequest.class);
    when(liquidacionRepository.findById(id)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> liquidacionService.actualizar(id, request)
    );

    verify(liquidacionRepository).findById(id);
    verifyNoInteractions(profesorRepository);
    verifyNoInteractions(liquidacionMapper);
  }

  @Test
  void actualizar_DebeLanzarExcepcion_CuandoProfesorNoExiste() {
    // Arrange
    Long id = 1L;
    Long profesorId = 999L;

    LiquidacionRequest request = mock(LiquidacionRequest.class);
    Liquidacion liquidacion = new Liquidacion();

    when(liquidacionRepository.findById(id)).thenReturn(Optional.of(liquidacion));
    when(request.profesorId()).thenReturn(profesorId);
    when(profesorRepository.findById(profesorId)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> liquidacionService.actualizar(id, request)
    );

    verify(liquidacionRepository).findById(id);
    verify(profesorRepository).findById(profesorId);
    verify(liquidacionRepository, never()).save(any(Liquidacion.class));
  }

  @Test
  void eliminar_DbeEliminarLiquidacion_CuandoExiste() {
    // Arrange
    Long id = 1L;
    when(liquidacionRepository.existsById(id)).thenReturn(true);

    // Act
    liquidacionService.eliminar(id);

    // Assert
    verify(liquidacionRepository).existsById(id);
    verify(liquidacionRepository).deleteById(id);
  }

  @Test
  void eliminar_DebeLanzarExcepcion_CuandoNoExiste() {
    // Arrange
    Long id = 999L;
    when(liquidacionRepository.existsById(id)).thenReturn(false);

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> liquidacionService.eliminar(id)
    );

    verify(liquidacionRepository).existsById(id);
    verify(liquidacionRepository, never()).deleteById(anyLong());
  }

}
