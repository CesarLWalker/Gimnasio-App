package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.response.DashboardResponse;
import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import com.pesguicom.gimnasio_backend.enums.EstadoLiquidacion;
import com.pesguicom.gimnasio_backend.enums.EstadoProfesor;
import com.pesguicom.gimnasio_backend.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DashboardServiceTest {

  @Mock
  private ClienteRepository clienteRepository;

  @Mock
  private ProfesorRepository profesorRepository;

  @Mock
  private HoraTrabajadaRepository horaTrabajadaRepository;

  @Mock
  private PagoRepository pagoRepository;

  @Mock
  private LiquidacionRepository liquidacionRepository;

  @InjectMocks
  private DashboardService dashboardService;

  @Test
  void obtenerResumen_DebeRetornarDatosDashboard() {
    // Arrange: simulamos los valores de los repositorios
    when(clienteRepository.count()).thenReturn(10L);
    when(profesorRepository.count()).thenReturn(5L);
    when(liquidacionRepository.count()).thenReturn(8L);

    when(liquidacionRepository.countByEstadoLiquidacion(EstadoLiquidacion.PENDIENTE)).thenReturn(3L);
    when(liquidacionRepository.countByEstadoLiquidacion(EstadoLiquidacion.PAGADA)).thenReturn(5L);
    when(profesorRepository.countByEstadoProfesor(EstadoProfesor.ACTIVO)).thenReturn(4L);
    when(profesorRepository.countByEstadoProfesor(EstadoProfesor.INACTIVO)).thenReturn(1L);
    when(clienteRepository.countByEstado(EstadoCliente.PAGADO)).thenReturn(7L);
    when(clienteRepository.countByEstado(EstadoCliente.DEBE)).thenReturn(3L);

    when(horaTrabajadaRepository.sumarHorasTotales()).thenReturn(120.0);
    when(pagoRepository.sumarMontos()).thenReturn(150000.0);

    // Act: ejecutamos el método que estamos probando
    DashboardResponse response = dashboardService.obtenerResumen();

    // Assert: verificamos los resultados
    assertNotNull(response);

    assertEquals(10L, response.totalClientes());
    assertEquals(5L, response.totalProfesores());
    assertEquals(8L, response.totalLiquidaciones());

    assertEquals(3L, response.liquidacionesPendientes());
    assertEquals(5L, response.liquidacionesPagadas());

    assertEquals(4L, response.profesorActivo());
    assertEquals(1L, response.profesorInactivo());

    assertEquals(7L, response.clientesPagados());
    assertEquals(3L, response.clientesDeudores());

    assertEquals(120.0, response.horasTotales());
    assertEquals(150000.0, response.recaudacionTotal());

    verify(clienteRepository).count();
    verify(profesorRepository).count();
    verify(liquidacionRepository).count();

    verify(liquidacionRepository).countByEstadoLiquidacion(EstadoLiquidacion.PENDIENTE);
    verify(liquidacionRepository).countByEstadoLiquidacion(EstadoLiquidacion.PAGADA);

    verify(profesorRepository).countByEstadoProfesor(EstadoProfesor.ACTIVO);
    verify(profesorRepository).countByEstadoProfesor(EstadoProfesor.INACTIVO);

    verify(clienteRepository).countByEstado(EstadoCliente.PAGADO);
    verify(clienteRepository).countByEstado(EstadoCliente.DEBE);

    verify(horaTrabajadaRepository).sumarHorasTotales();
    verify(pagoRepository).sumarMontos();

    verifyNoMoreInteractions(
      clienteRepository,
      profesorRepository,
      horaTrabajadaRepository,
      pagoRepository,
      liquidacionRepository
    );
  }
}
