package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.PagoRequest;
import com.pesguicom.gimnasio_backend.dto.response.PagoResponse;
import com.pesguicom.gimnasio_backend.entity.Cliente;
import com.pesguicom.gimnasio_backend.entity.Pago;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.PagoMapper;
import com.pesguicom.gimnasio_backend.repository.ClienteRepository;
import com.pesguicom.gimnasio_backend.repository.PagoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PagoServiceTest {

  @Mock
  private PagoRepository pagoRepository;

  @Mock
  private ClienteRepository clienteRepository;

  @Mock
  private PagoMapper pagoMapper;

  @InjectMocks
  private PagoService pagoService;

  @BeforeEach
  void setUp() {
    // Mockito prepara las dependencias del servicio
  }

  @Test
  void crear_CuandoClienteExiste_RetornarPagoResponse() {

    // Arrange: preparamos los datos
    Long clienteId = 1L;

    PagoRequest request = mock(PagoRequest.class);
    when(request.clienteId()).thenReturn(clienteId);

    Cliente cliente = new Cliente();

    when(clienteRepository.findById(clienteId)).thenReturn(java.util.Optional.of(cliente));

    Pago pagoGuardado = mock(Pago.class);
    PagoResponse respuestaEsperada = mock(PagoResponse.class);

    when(pagoRepository.save(any(Pago.class))).thenReturn(pagoGuardado);
    when(pagoMapper.toResponse(pagoGuardado)).thenReturn(respuestaEsperada);

    // Act: ejecutamos el método
    PagoResponse resultado = pagoService.crear(request);

    // Assert: verificamos el resultado
    assertNotNull(resultado);
    assertSame(respuestaEsperada, resultado);

    // Verify
    verify(clienteRepository).findById(clienteId);
    verify(pagoRepository).save(any(Pago.class));
    verify(pagoMapper).toResponse(pagoGuardado);
  }

  @Test
  void crear_CuandoClienteNoExiste_LanzaExcepcion() {

    // Arrange
    Long clienteId = 999L;

    PagoRequest request = mock(PagoRequest.class);
    when(request.clienteId()).thenReturn(clienteId);

    when(clienteRepository.findById(clienteId)).thenReturn(java.util.Optional.empty());

    // Act + Assert
    ResourceNotFoundException exception = assertThrows(
      ResourceNotFoundException.class, () -> pagoService.crear(request)
    );

    assertEquals("Cliente no encontrado con id: 999", exception.getMessage());

    // Verify
    verify(clienteRepository).findById(clienteId);
    verify(pagoRepository, never()).save(any(Pago.class));
    verifyNoInteractions(pagoMapper);
  }

  @Test
  void listar_CuandoExistenPagos_RetornarListaDePagosResponse() {

    // Arrange
    Pago pago1 = mock(Pago.class);
    Pago pago2 = mock(Pago.class);

    PagoResponse response1 = mock(PagoResponse.class);
    PagoResponse response2 = mock(PagoResponse.class);

    when(pagoRepository.findAll()).thenReturn(List.of(pago1, pago2));
    when(pagoMapper.toResponse(pago1)).thenReturn(response1);
    when(pagoMapper.toResponse(pago2)).thenReturn(response2);

    // Act
    List<PagoResponse> resultado = pagoService.listar();

    // Assert
    assertEquals(2, resultado.size());
    assertSame(response1, resultado.get(0));
    assertSame(response2, resultado.get(1));

    // Verify
    verify(pagoRepository).findAll();
    verify(pagoMapper).toResponse(pago1);
    verify(pagoMapper).toResponse(pago2);
  }

  @Test
  void buscarPorId_CuandoPagoExiste_RetornarPagoResponse() {

    // Arrange
    Long pagoId = 1L;

    Pago pago = mock(Pago.class);
    PagoResponse respuestaEsperada = mock(PagoResponse.class);

    when(pagoRepository.findById(pagoId)).thenReturn(Optional.of(pago));
    when(pagoMapper.toResponse(pago)).thenReturn(respuestaEsperada);

    // Act
    PagoResponse resultado = pagoService.buscarPorId(pagoId);

    // Assert
    assertNotNull(resultado);
    assertSame(respuestaEsperada, resultado);

    // Verify
    verify(pagoRepository).findById(pagoId);
    verify(pagoMapper).toResponse(pago);
  }

  @Test
  void buscarPorId_CuandoPagoNoExiste_LanzarException() {

    // Arrange
    Long pagoId = 999L;
    when(pagoRepository.findById(pagoId)).thenReturn(Optional.empty());

    // Act + Assert
    ResourceNotFoundException exception = assertThrows(
      ResourceNotFoundException.class, () -> pagoService.buscarPorId(pagoId)
    );

    assertEquals("Pago no encontrado con id: 999", exception.getMessage());

    // Verify
    verify(pagoRepository).findById(pagoId);
    verifyNoInteractions(pagoMapper);
  }

  @Test
  void actualizar_CuandoPagoYClienteExisten_RetornarPagoResponse() {

    // Arrange
    Long pagoId = 1L;
    Long clienteId = 2L;

    PagoRequest request = mock(PagoRequest.class);
    when(request.clienteId()).thenReturn(clienteId);

    Pago pagoExistente = mock(Pago.class);
    Cliente cliente = new Cliente();

    PagoResponse respuestaEsperada = mock(PagoResponse.class);
    when(pagoRepository.findById(pagoId)).thenReturn(Optional.of(pagoExistente));
    when(clienteRepository.findById(clienteId)).thenReturn(Optional.of(cliente));
    when(pagoRepository.save(pagoExistente)).thenReturn(pagoExistente);
    when(pagoMapper.toResponse(pagoExistente)).thenReturn(respuestaEsperada);

    // Act
    PagoResponse resultado = pagoService.actualizar(pagoId, request);

    // Assert
    assertNotNull(resultado);
    assertSame(respuestaEsperada, resultado);

    // Verify
    verify(pagoRepository).findById(pagoId);
    verify(clienteRepository).findById(clienteId);
    verify(pagoRepository).save(pagoExistente);
    verify(pagoMapper).toResponse(pagoExistente);
  }

  @Test
  void actualizar_CuandoPagoNoExiste_LanzaException() {

    // Arrange
    Long pagoId = 999L;

    PagoRequest request = mock(PagoRequest.class);
    when(pagoRepository.findById(pagoId)).thenReturn(Optional.empty());

    // Act + Assert
    ResourceNotFoundException exception = assertThrows(
      ResourceNotFoundException.class, () -> pagoService.actualizar(pagoId, request)
    );

    assertEquals("Pago no encontrado con id: 999", exception.getMessage());

    // Verify
    verify(pagoRepository).findById(pagoId);
    verifyNoInteractions(clienteRepository);
    verify(pagoRepository, never()).save(any(Pago.class));
    verifyNoInteractions(pagoMapper);
  }

  @Test
  void actualizar_CuandoClienteNoExiste_LanzaException() {

    // Arrange
    Long pagoId = 1L;
    Long clienteId = 999L;

    PagoRequest request = mock(PagoRequest.class);
    when(request.clienteId()).thenReturn(clienteId);

    Pago pagoExistente = mock(Pago.class);
    when(pagoRepository.findById(pagoId)).thenReturn(Optional.of(pagoExistente));
    when(clienteRepository.findById(clienteId)).thenReturn(Optional.empty());

    // Act + Assert
    ResourceNotFoundException exception = assertThrows(
      ResourceNotFoundException.class, () -> pagoService.actualizar(pagoId, request)
    );

    assertEquals("Cliente no encontrado con id: 999", exception.getMessage());

    // Verify
    verify(pagoRepository).findById(pagoId);
    verify(clienteRepository).findById(clienteId);
    verify(pagoRepository, never()).save(any(Pago.class));
    verifyNoInteractions(pagoMapper);
  }

  @Test
  void eliminar_CuandoPagoExiste_eliminarCorrectamente() {

    // Arrange
    Long pagoId = 1L;
    when(pagoRepository.existsById(pagoId)).thenReturn(true);

    // Act
    pagoService.eliminar(pagoId);

    // Assert
    verify(pagoRepository).existsById(pagoId);
    verify(pagoRepository).deleteById(pagoId);
  }

  @Test
  void eliminar_CuandoPagoNoExiste_LanzaException() {

    // Arrange
    Long pagoId = 999L;
    when(pagoRepository.existsById(pagoId)).thenReturn(false);

    // Act + Assert
    ResourceNotFoundException exception = assertThrows(
      ResourceNotFoundException.class, () -> pagoService.eliminar(pagoId)
    );

    assertEquals("Pago no encontrado con id: 999", exception.getMessage());

    verify(pagoRepository).existsById(pagoId);
    verify(pagoRepository, never()).deleteById(pagoId);
  }

}
