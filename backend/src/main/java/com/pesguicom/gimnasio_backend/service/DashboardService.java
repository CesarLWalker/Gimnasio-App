package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.response.DashboardResponse;
import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import com.pesguicom.gimnasio_backend.enums.EstadoLiquidacion;
import com.pesguicom.gimnasio_backend.enums.EstadoProfesor;
import com.pesguicom.gimnasio_backend.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DashboardService {

  private final ClienteRepository clienteRepository;
  private final ProfesorRepository profesorRepository;
  private final HoraTrabajadaRepository horaTrabajadaRepository;
  private final PagoRepository pagoRepository;
  private final LiquidacionRepository liquidacionRepository;

  public DashboardService(
    ClienteRepository clienteRepository,
    ProfesorRepository profesorRepository,
    HoraTrabajadaRepository horaTrabajadaRepository,
    PagoRepository pagoRepository,
    LiquidacionRepository liquidacionRepository) {

    this.clienteRepository = clienteRepository;
    this.profesorRepository = profesorRepository;
    this.horaTrabajadaRepository = horaTrabajadaRepository;
    this.pagoRepository = pagoRepository;
    this.liquidacionRepository = liquidacionRepository;
  }

  public DashboardResponse obtenerResumen() {

    long totalClientes = clienteRepository.count();
    long totalProfesores = profesorRepository.count();
    long totalLiquidaciones = liquidacionRepository.count();

    long liquidacionesPendientes = liquidacionRepository.countByEstadoLiquidacion(EstadoLiquidacion.PENDIENTE);
    long liquidacionesPagadas = liquidacionRepository.countByEstadoLiquidacion(EstadoLiquidacion.PAGADA);

    long profesoresActivos = profesorRepository.countByEstadoProfesor(EstadoProfesor.ACTIVO);
    long profesoresInactivos = profesorRepository.countByEstadoProfesor(EstadoProfesor.INACTIVO);

    long clientesPagados = clienteRepository.countByEstado(EstadoCliente.PAGADO);
    long clientesDeudores = clienteRepository.countByEstado(EstadoCliente.DEBE);

    double horasTotales = horaTrabajadaRepository.sumarHorasTotales();
    double recaudacionTotal = pagoRepository.sumarMontos();

    return new DashboardResponse(
      totalClientes,
      totalProfesores,
      totalLiquidaciones,
      liquidacionesPendientes,
      liquidacionesPagadas,
      profesoresActivos,
      profesoresInactivos,
      clientesPagados,
      clientesDeudores,
      horasTotales,
      recaudacionTotal
    );
  }
}
