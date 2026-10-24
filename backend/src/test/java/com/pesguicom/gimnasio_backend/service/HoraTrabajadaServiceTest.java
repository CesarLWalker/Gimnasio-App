package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.HoraTrabajadaRequest;
import com.pesguicom.gimnasio_backend.dto.response.HoraTrabajadaResponse;
import com.pesguicom.gimnasio_backend.entity.HoraTrabajada;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.HoraTrabajadaMapper;
import com.pesguicom.gimnasio_backend.repository.HoraTrabajadaRepository;
import com.pesguicom.gimnasio_backend.repository.ProfesorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HoraTrabajadaServiceTest {

  @Mock
  private HoraTrabajadaRepository horaTrabajadaRepository;

  @Mock
  private ProfesorRepository profesorRepository;

  @Mock
  private HoraTrabajadaMapper horaTrabajadaMapper;

  @InjectMocks
  private HoraTrabajadaService horaTrabajadaService;

  @BeforeEach
  void setUp(){
    // Mockito prepara automáticamente los objetos simulados.
  }

  @Test
  void crear_DeberiaGuardarHoraTrabajadaCorrectamente() {

    // Arrange: prepara los datos
    Profesor profesor = new Profesor();
    profesor.setId(1L);

    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      1L,
      LocalDate.of(2026, 10, 11),
      LocalTime.of(8, 0),
      LocalTime.of(12, 0)
    );

    HoraTrabajada horaGuardada = HoraTrabajada.builder()
      .profesor(profesor)
      .fecha(request.fecha())
      .horaEntrada(request.horaEntrada())
      .horaSalida(request.horaSalida())
      .horasTotales(4.0)
      .build();

    HoraTrabajadaResponse response = mock(HoraTrabajadaResponse.class);

    when(profesorRepository.findById(1L)).thenReturn(Optional.of(profesor));
    when(horaTrabajadaRepository.save(any(HoraTrabajada.class))).thenReturn(horaGuardada);
    when(horaTrabajadaMapper.toResponse(horaGuardada)).thenReturn(response);

    // Act: ejecutar el método
    HoraTrabajadaResponse resultado = horaTrabajadaService.crear(request);

    // Assert: comprobar el resultado
    assertNotNull(resultado);

    verify(profesorRepository).findById(1L);
    verify(horaTrabajadaRepository).save(any(HoraTrabajada.class));
    verify(horaTrabajadaMapper).toResponse(horaGuardada);
  }

  @Test
  void crear_DeberiaCalcularCorrectamenteLasHorasTotales() {

    // Arrange
    Profesor profesor = new Profesor();
    profesor.setId(1L);

    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      1L,
      LocalDate.of(2026, 10, 11),
      LocalTime.of(8, 0),
      LocalTime.of(12, 0)
    );

    when(profesorRepository.findById(1L)).thenReturn(Optional.of(profesor));
    when(horaTrabajadaRepository.save(any(HoraTrabajada.class))).thenAnswer(invocation -> invocation.getArgument(0));

    // Act
    horaTrabajadaService.crear(request);

    // Assert
    verify(horaTrabajadaRepository).save(argThat(horaTrabajada -> Double.compare(horaTrabajada.getHorasTotales(), 4.0) == 0));

  }

  @Test
  void crear_DeberiaLanzarExcepcionSiProfesorNoExiste() {

    // Arrange
    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      999L,
      LocalDate.of(2026, 10, 11),
      LocalTime.of(8, 0),
      LocalTime.of(12, 0)
    );

    when(profesorRepository.findById(999L)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(ResourceNotFoundException.class, () -> horaTrabajadaService.crear(request));

    verify(profesorRepository).findById(999L);
    verify(horaTrabajadaRepository, never()).save(any(HoraTrabajada.class));
  }

  @Test
  void crear_DeberiaLanzarExcepcionSiSalidaEsAnteriorAEntrada() {

    // Arrange
    Profesor profesor = new Profesor();
    profesor.setId(1L);

    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      1L,
      LocalDate.of(2026, 10, 11),
      LocalTime.of(12, 0),
      LocalTime.of(8, 0)
    );
    when(profesorRepository.findById(1L)).thenReturn(Optional.of(profesor));

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> horaTrabajadaService.crear(request)
    );

    verify(horaTrabajadaRepository, never()).save(any(HoraTrabajada.class));
  }

  @Test
  void crear_DeberiaLanzarExcepcionSiEntradaYSalidaSonIguales() {

    // Arrange
    Profesor profesor = new Profesor();
    profesor.setId(1L);

    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      1L,
      LocalDate.of(2026, 10, 11),
      LocalTime.of(8, 0),
      LocalTime.of(8, 0)
    );
    when(profesorRepository.findById(1L)).thenReturn(Optional.of(profesor));

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> horaTrabajadaService.crear(request)
    );
    verify(horaTrabajadaRepository, never()).save(any(HoraTrabajada.class));
  }

  @Test
  void listar_DeberiaDevolverListaDeHorasTrabajadas() {

    // Arrange
    Profesor profesor = new Profesor();
    profesor.setId(1L);

    HoraTrabajada hora1 = HoraTrabajada.builder()
      .profesor(profesor)
      .fecha(LocalDate.of(2026, 10, 11))
      .horaEntrada(LocalTime.of(8, 0))
      .horaSalida(LocalTime.of(12, 0))
      .horasTotales(4.0)
      .build();

    HoraTrabajada hora2 = HoraTrabajada.builder()
      .profesor(profesor)
      .fecha(LocalDate.of(2026, 10, 11))
      .horaEntrada(LocalTime.of(14, 0))
      .horaSalida(LocalTime.of(17, 0))
      .horasTotales(3.0)
      .build();

    HoraTrabajadaResponse response1 = mock(HoraTrabajadaResponse.class);
    HoraTrabajadaResponse response2 = mock(HoraTrabajadaResponse.class);

    when(horaTrabajadaRepository.findAll()).thenReturn(List.of(hora1, hora2));
    when(horaTrabajadaMapper.toResponse(hora1)).thenReturn(response1);
    when(horaTrabajadaMapper.toResponse(hora2)).thenReturn(response2);

    // Act
    List<HoraTrabajadaResponse> resultado = horaTrabajadaService.listar();

    // Assert
    assertEquals(2, resultado.size());
    assertSame(response1, resultado.get(0));
    assertSame(response2, resultado.get(1));

    verify(horaTrabajadaRepository).findAll();
    verify(horaTrabajadaMapper, times(2)).toResponse(any(HoraTrabajada.class));
  }

  @Test
  void buscarPorId_DeberiaDevolverHoraTrabajadaCuandoExiste() {

    // Arrange
    Profesor profesor = new Profesor();
    profesor.setId(1L);

    HoraTrabajada hora = HoraTrabajada.builder()
      .profesor(profesor)
      .fecha(LocalDate.of(2026, 10, 11))
      .horaEntrada(LocalTime.of(8, 0))
      .horaSalida(LocalTime.of(12, 0))
      .horasTotales(4.0)
      .build();

    HoraTrabajadaResponse response = mock(HoraTrabajadaResponse.class);
    when(horaTrabajadaRepository.findById(1L)).thenReturn(Optional.of(hora));
    when(horaTrabajadaMapper.toResponse(hora)).thenReturn(response);

    // Act
    HoraTrabajadaResponse resultado = horaTrabajadaService.buscarPorId(1L);

    // Assert
    assertNotNull(resultado);
    assertSame(response, resultado);

    verify(horaTrabajadaRepository).findById(1L);
    verify(horaTrabajadaMapper).toResponse(hora);
  }

  @Test
  void buscarPorId_DeberiaLanzarExcepcionSiNoExiste() {

    // Arrange
    when(horaTrabajadaRepository.findById(999L)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> horaTrabajadaService.buscarPorId(999L)
    );

    verify(horaTrabajadaRepository).findById(999L);
    verify(horaTrabajadaMapper, never()).toResponse(any(HoraTrabajada.class));
  }

  @Test
  void actualizar_DeberiaActualizarHoraTrabajadaCorrectamente() {

    // Arrange
    Profesor profesor = new Profesor();
    profesor.setId(1L);

    HoraTrabajada horaExistente = HoraTrabajada.builder()
      .profesor(profesor)
      .fecha(LocalDate.of(2026, 10, 10))
      .horaEntrada(LocalTime.of(8, 0))
      .horaSalida(LocalTime.of(10, 0))
      .horasTotales(2.0)
      .build();

    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      1L,
      LocalDate.of(2026, 10, 11),
      LocalTime.of(8, 0),
      LocalTime.of(12, 0)
    );

    HoraTrabajadaResponse response = mock(HoraTrabajadaResponse.class);

    when(horaTrabajadaRepository.findById(1L)).thenReturn(Optional.of(horaExistente));
    when(profesorRepository.findById(1L)).thenReturn(Optional.of(profesor));
    when(horaTrabajadaRepository.save(horaExistente)).thenReturn(horaExistente);
    when(horaTrabajadaMapper.toResponse(horaExistente)).thenReturn(response);

    // Act
    HoraTrabajadaResponse resultado = horaTrabajadaService.actualizar(1L, request);

    // Assert
    assertNotNull(resultado);
    assertEquals(LocalDate.of(2026, 10, 11), horaExistente.getFecha());
    assertEquals(LocalTime.of(12, 0), horaExistente.getHoraSalida());
    assertEquals(4.0, horaExistente.getHorasTotales());

    verify(horaTrabajadaRepository).findById(1L);
    verify(profesorRepository).findById(1L);
    verify(horaTrabajadaRepository).save(horaExistente);
    verify(horaTrabajadaMapper).toResponse(horaExistente);
  }

  @Test
  void actualizar_DeberiaLanzarExcepcionSiHoraTrabajadaNoExiste() {

    // Arrange
    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      1L,
      LocalDate.of(2026, 10, 11),
      LocalTime.of(8, 0),
      LocalTime.of(12, 0)
    );
    when(horaTrabajadaRepository.findById(999L)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> horaTrabajadaService.actualizar(999L, request)
    );

    verify(horaTrabajadaRepository).findById(999L);
    verify(profesorRepository, never()).findById(anyLong());
    verify(horaTrabajadaRepository, never()).save(any(HoraTrabajada.class));
  }

  @Test
  void actualizar_DeberiaLanzarExcepcionSiElProfesorNoExiste() {

    // Arrange
    Profesor profesorOriginal = new Profesor();
    profesorOriginal.setId(1L);

    HoraTrabajada horaExistente = HoraTrabajada.builder()
      .profesor(profesorOriginal)
      .fecha(LocalDate.of(2026, 10, 10))
      .horaEntrada(LocalTime.of(8, 0))
      .horaSalida(LocalTime.of(10, 0))
      .horasTotales(2.0)
      .build();

    HoraTrabajadaRequest request = new HoraTrabajadaRequest(
      999L,
      LocalDate.of(2026, 10, 10),
      LocalTime.of(8, 0),
      LocalTime.of(12, 0)
    );

    when(horaTrabajadaRepository.findById(1L)).thenReturn(Optional.of(horaExistente));
    when(profesorRepository.findById(999L)).thenReturn(Optional.empty());

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> horaTrabajadaService.actualizar(1L, request)
    );

    // Verificar que no se guarde el registro
    verify(horaTrabajadaRepository, never()).save(any(HoraTrabajada.class));

    // El profesor original debe seguir asociado
    assertEquals(1L, horaExistente.getProfesor().getId());
  }

  @Test
  void eliminar_DeberiaEliminarHoraTrabajadaCuandoExiste() {

    // Arrange
    when(horaTrabajadaRepository.existsById(1L)).thenReturn(true);

    // Act
    horaTrabajadaService.eliminar(1L);

    // Assert
    verify(horaTrabajadaRepository).existsById(1L);
    verify(horaTrabajadaRepository).deleteById(1L);
  }

  @Test
  void eliminar_DeberiaLanzarExcepcionSiNoExiste() {

    // Arrange
    when(horaTrabajadaRepository.existsById(999L)).thenReturn(false);

    // Act + Assert
    assertThrows(
      ResourceNotFoundException.class, () -> horaTrabajadaService.eliminar(999L)
    );

    // Verificar que se compruebe la existencia
    verify(horaTrabajadaRepository).existsById(999L);

    // Verificar que no se intente eliminar
    verify(horaTrabajadaRepository, never()).deleteById(anyLong());
  }
}
