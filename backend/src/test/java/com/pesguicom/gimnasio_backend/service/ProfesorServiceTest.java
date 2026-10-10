package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.ProfesorRequest;
import com.pesguicom.gimnasio_backend.dto.response.ProfesorResponse;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import com.pesguicom.gimnasio_backend.enums.EstadoProfesor;
import com.pesguicom.gimnasio_backend.enums.TipoRemuneracion;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.ProfesorMapper;
import com.pesguicom.gimnasio_backend.repository.ProfesorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProfesorServiceTest {

  @Mock
  private ProfesorRepository profesorRepository;

  @Mock
  private ProfesorMapper profesorMapper;

  @InjectMocks
  private ProfesorService profesorService;

  @Test
  void listar_CuandoNoHayProfesores_DebeRetornarListaVacia() {

    // Arrange
    when(profesorRepository.findAll()).thenReturn(List.of());

    // Act
    List<ProfesorResponse> resultado = profesorService.listar();

    // Assert
    assertNotNull(resultado);
    assertTrue(resultado.isEmpty());

    // Verify
    verify(profesorRepository).findAll();
    verifyNoInteractions(profesorMapper);
  }

  @Test
  void listar_CuandoHayProfesores_DebeRetornarListaDeProfesores() {

    // Arrange
    Profesor profesor1 = Profesor.builder()
      .id(1L)
      .build();

    Profesor profesor2 = Profesor.builder()
      .id(2L)
      .build();

    ProfesorResponse respuesta1 = mock(ProfesorResponse.class);
    ProfesorResponse respuesta2 = mock(ProfesorResponse.class);

    when(profesorRepository.findAll()).thenReturn(List.of(profesor1, profesor2));
    when(profesorMapper.toResponse(profesor1)).thenReturn(respuesta1);
    when(profesorMapper.toResponse(profesor2)).thenReturn(respuesta2);

    // Act
    List<ProfesorResponse> resultado = profesorService.listar();

    // Assert
    assertEquals(2, resultado.size());
    assertEquals(List.of(respuesta1, respuesta2), resultado);

    // Verify
    verify(profesorRepository).findAll();
    verify(profesorMapper).toResponse(profesor1);
    verify(profesorMapper).toResponse(profesor2);
  }

  @Test
  void buscarPorId_CuandoProfesorExiste_DebeRetornarProfesor() {

    // Arrange
    Long id = 1L;

    Profesor profesor = Profesor.builder()
      .id(id)
      .build();

    ProfesorResponse respuestaEsperada = mock(ProfesorResponse.class);

    when(profesorRepository.findById(id)).thenReturn(Optional.of(profesor));
    when(profesorMapper.toResponse(profesor)).thenReturn(respuestaEsperada);

    // Act
    ProfesorResponse resultado = profesorService.buscarPorId(id);

    // Assert
    assertNotNull(resultado);
    assertSame(respuestaEsperada, resultado);

    // Verify
    verify(profesorRepository).findById(id);
    verify(profesorMapper).toResponse(profesor);
  }

  @Test
  void buscarPorId_CuandoProfesorNoExiste_DebeLanzarException() {

    // Arrange
    Long id = 999L;

    when(profesorRepository.findById(id)).thenReturn(Optional.empty());

    // Act y Assert
    ResourceNotFoundException exception = assertThrows(
      ResourceNotFoundException.class, () -> profesorService.buscarPorId(id)
    );

    assertEquals("Profesor con id " + id + " no encontrado", exception.getMessage());

    // Verify
    verify(profesorRepository).findById(id);
    verifyNoInteractions(profesorMapper);
  }

  @Test
  void crear_DebeGuardarYRetornarProfesorResponse() {

    // Arrange: preparamos los datos
    ProfesorRequest request = new ProfesorRequest(
      "César Walker",
      "3492123456",
      "Musculación",
      20000.0,
      5000.0,
      TipoRemuneracion.POR_HORA,
      EstadoProfesor.ACTIVO,
      "💪",
      "#4CAF50"
    );

    Profesor profesor = Profesor.builder()
      .id(1L)
      .build();

    Profesor profesorGuardado = Profesor.builder()
      .id(1L)
      .build();

    ProfesorResponse respuestaEsperada = mock(ProfesorResponse.class);

    when(profesorMapper.toEntity(request)).thenReturn(profesor);
    when(profesorRepository.save(profesor)).thenReturn(profesorGuardado);
    when(profesorMapper.toResponse(profesorGuardado)).thenReturn(respuestaEsperada);

    // Act: ejecutamos el servicio
    ProfesorResponse resultado = profesorService.crear(request);

    // Assert: comprobamos la respuesta
    assertNotNull(resultado);
    assertSame(respuestaEsperada, resultado);

    // Verify: comprobamos las interacciones
    verify(profesorMapper).toEntity(request);
    verify(profesorRepository).save(profesor);
    verify(profesorMapper).toResponse(profesorGuardado);

  }

  @Test
  void actualizar_CuandoProfesorExiste_DebeActualizarYRetornarRespuesta() {

    // Arrange
    Long id = 1L;

    ProfesorRequest request = new ProfesorRequest(
      "César Walker Actualizado",
      "3492123456",
      "Musculación",
      100000.0,
      12000.0,
      TipoRemuneracion.POR_HORA,
      EstadoProfesor.ACTIVO,
      "💪",
      "#4CAF50"
    );

    Profesor profesorExistente = Profesor.builder()
      .id(id)
      .build();

    Profesor profesorActualizado = Profesor.builder()
      .id(id)
      .build();

    ProfesorResponse respuestaEsperada = mock(ProfesorResponse.class);

    when(profesorRepository.findById(id)).thenReturn(Optional.of(profesorExistente));
    when(profesorRepository.save(profesorExistente)).thenReturn(profesorActualizado);
    when(profesorMapper.toResponse(profesorActualizado)).thenReturn(respuestaEsperada);

    // Act
    ProfesorResponse resultado = profesorService.actualizar(id, request);

    // Assert
    assertNotNull(resultado);
    assertSame(respuestaEsperada, resultado);

    // Verify
    verify(profesorRepository).findById(id);
    verify(profesorMapper).updateEntity(profesorExistente, request);
    verify(profesorRepository).save(profesorExistente);
    verify(profesorMapper).toResponse(profesorActualizado);
  }

  @Test
  void actualizar_CuandoProfesorNoExiste_DebeLanzarException() {

    // Arrange
    Long id = 999L;

    ProfesorRequest request = new ProfesorRequest(
      "César Walker",
      "3492123456",
      "Musculación",
      200000.0,
      5000.0,
      TipoRemuneracion.POR_HORA,
      EstadoProfesor.ACTIVO,
      "💪",
      "#4CAF50"
    );

    when(profesorRepository.findById(id)).thenReturn(Optional.empty());

    // Act y Assert
    ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
      () -> profesorService.actualizar(id, request));

    assertEquals("Profesor con id " + id + " no encontrado", exception.getMessage());

    // Verify
    verify(profesorRepository).findById(id);
    verify(profesorRepository, never()).save(any(Profesor.class));
    verifyNoInteractions(profesorMapper);
  }

  @Test
  void eliminar_CuandoProfesorExiste_DebeEliminarProfesor() {

    // Arrange
    Long id = 1L;

    Profesor profesor = Profesor.builder()
      .id(id)
      .build();

    when(profesorRepository.findById(id)).thenReturn(Optional.of(profesor));

    // Act
    profesorService.eliminar(id);

    // Assert y Verify
    verify(profesorRepository).findById(id);
    verify(profesorRepository).delete(profesor);
  }
}
