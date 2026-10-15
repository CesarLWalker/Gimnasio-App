package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.ClienteRequest;
import com.pesguicom.gimnasio_backend.dto.response.ClienteResponse;
import com.pesguicom.gimnasio_backend.entity.Cliente;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.ClienteMapper;
import com.pesguicom.gimnasio_backend.repository.ClienteRepository;
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
public class ClienteServiceTest {

  @Mock
  private ClienteRepository clienteRepository;

  @Mock
  private ClienteMapper clienteMapper;

  @InjectMocks
  private ClienteService clienteService;

  @Test
  void listarClientes_CuandoHayClientes_DebeRetornarListaDeClientes() {

    // Arrange: preparamos los datos
    Cliente cliente1 = Cliente.builder()
      .id(1L)
      .build();

    Cliente cliente2 = Cliente.builder()
      .id(2L)
      .build();

    ClienteResponse respuesta1 = new ClienteResponse(1L, "César Walker", "3492123456", null, null);

    ClienteResponse respuesta2 = new ClienteResponse(2L, "Leandro Walker", "3492203040", null, null);

    when(clienteRepository.findAll()).thenReturn(List.of(cliente1, cliente2));

    when(clienteMapper.toResponse(cliente1)).thenReturn(respuesta1);
    when(clienteMapper.toResponse(cliente2)).thenReturn(respuesta2);

    // Act: ejecutamos el servicio
    List<ClienteResponse> resultado = clienteService.listarClientes();

    // Assert: comprobamos el resultado
    assertEquals(2, resultado.size());
    assertEquals(List.of(respuesta1, respuesta2), resultado);

    // Verificamos las interacciones
    verify(clienteRepository).findAll();
    verify(clienteMapper).toResponse(cliente1);
    verify(clienteMapper).toResponse(cliente2);
  }

  @Test
  void listarClientes_CuandoNoHayClientes_DebeRetornarListaVacia() {

    // Arrange: preparamos el escenario
    when(clienteRepository.findAll()).thenReturn(List.of());

    // Act: ejecutamos el método que queremos probar
    var resultado = clienteService.listarClientes();

    // Assert: comprobamos el resultado
    assertTrue(resultado.isEmpty());

    // Verificamos que el servicio consultó el repositorio
    verify(clienteRepository).findAll();
  }

  @Test
  void buscarPorId_CuandoClienteExiste_DebeRetornarCliente() {

    // Arrange
    Long id = 1L;

    Cliente cliente = Cliente.builder()
      .id(id)
      .build();

    ClienteResponse respuestaEsperada = new ClienteResponse(
      id,
      "César",
      "3492123456",
      null,
      null
    );

    when(clienteRepository.findById(id)).thenReturn(Optional.of(cliente));

    when(clienteMapper.toResponse(cliente)).thenReturn(respuestaEsperada);

    // Act
    ClienteResponse resultado = clienteService.buscarPorId(id);

    // Assert
    assertEquals(respuestaEsperada, resultado);
    verify(clienteRepository).findById(id);
    verify(clienteMapper).toResponse(cliente);
  }

  @Test
  void buscarPorId_CuandoClienteNoExiste_DebeLanzarException() {

    // Arrange
    Long id = 999L;

    when(clienteRepository.findById(id)).thenReturn(Optional.empty());

    // Act y Assert
    ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> clienteService.buscarPorId(id));

    assertEquals("Cliente con id " + id + " no encontrado", exception.getMessage());

    verify(clienteRepository).findById(id);
  }

  @Test
  void guardarCliente_DebeGuardarYRetornarClienteResponse() {

    // Arrange: preparamos los datos
    ClienteRequest request = new ClienteRequest(
      "César Walker",
      "3492123456",
      null,
      null
    );

    Cliente cliente = Cliente.builder()
      .id(1L)
      .build();

    Cliente clienteGuardado = Cliente.builder()
      .id(1L)
      .build();

    ClienteResponse respuestaEsperada = new ClienteResponse(
      1L,
      "César Walker",
      "3492123456",
      null,
      null
    );

    when(clienteMapper.toEntity(request)).thenReturn(cliente);
    when(clienteRepository.save(cliente)).thenReturn(clienteGuardado);
    when(clienteMapper.toResponse(clienteGuardado)).thenReturn(respuestaEsperada);

    // Act: ejecutamos el método
    ClienteResponse resultado = clienteService.guardarCliente(request);

    // Assert: comprobamos la respuesta
    assertNotNull(resultado);
    assertEquals(respuestaEsperada, resultado);

    // Verify: comprobamos las interacciones
    verify(clienteMapper).toEntity(request);
    verify(clienteRepository).save(cliente);
    verify(clienteMapper).toResponse(clienteGuardado);
  }

  @Test
  void actualizarCliente_CuandoClienteExiste_DebeActualizarYRetornarRespuesta() {

    // Arrange
    Long id = 1L;

    ClienteRequest request = new ClienteRequest(
      "César Actualizado",
      "3492999999",
      null,
      null
    );

    Cliente clienteExistente = Cliente.builder()
      .id(id)
      .build();

    Cliente clienteActualizado = Cliente.builder()
      .id(id)
      .build();

    ClienteResponse respuestaEsperada = new ClienteResponse(
      id,
      "César Actualizado",
      "3492999999",
      null,
      null
    );

    when(clienteRepository.findById(id)).thenReturn(Optional.of(clienteExistente));
    when(clienteRepository.save(clienteExistente)).thenReturn(clienteActualizado);
    when(clienteMapper.toResponse(clienteActualizado)).thenReturn(respuestaEsperada);

    // Act
    ClienteResponse resultado = clienteService.actualizarCliente(id, request);

    // Assert
    assertNotNull(resultado);
    assertEquals(respuestaEsperada, resultado);

    // Verify
    verify(clienteRepository).findById(id);
    verify(clienteRepository).save(clienteExistente);
    verify(clienteMapper).toResponse(clienteActualizado);
  }

  @Test
  void actualizarCliente_CuandoClienteNoExiste_DebeRetornarNull() {

    // Arrange
    Long id = 999L;

    ClienteRequest request = new ClienteRequest(
      "César Walker",
      "3492123456",
      null,
      null
    );

    when(clienteRepository.findById(id)).thenReturn(Optional.empty());

    // Act
    ClienteResponse resultado = clienteService.actualizarCliente(id, request);

    // Assert
    assertNull(resultado);

    // Verify
    verify(clienteRepository).findById(id);
    verify(clienteRepository, never()).save(any(Cliente.class));
    verifyNoInteractions(clienteMapper);
  }

  @Test
  void eliminarCliente_DebeLlamarAlRepositorioConElIdCorrecto() {

    // Arrange
    Long id = 1L;

    // Act
    clienteService.eliminarCliente(id);

    // Assert y Verify
    verify(clienteRepository).deleteById(id);

  }

}
