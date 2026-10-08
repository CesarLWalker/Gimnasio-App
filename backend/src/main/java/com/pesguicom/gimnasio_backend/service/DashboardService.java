package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.response.DashboardResponse;
import com.pesguicom.gimnasio_backend.enums.EstadoCliente;
import com.pesguicom.gimnasio_backend.enums.EstadoLiquidacion;
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
    double totalHorasTrabajadas = horaTrabajadaRepository.sumarHorasTotales();
    long totalLiquidaciones = liquidacionRepository.count();

    long clientesPagados = clienteRepository.countByEstado(EstadoCliente.PAGADO);
    long clientesDeudores = clienteRepository.countByEstado(EstadoCliente.DEBE);

    long liquidacionesPendientes = liquidacionRepository.countByEstado(EstadoLiquidacion.PENDIENTE);
    long liquidacionesPagadas = liquidacionRepository.countByEstado(EstadoLiquidacion.PAGADA);

    double recaudacionTotal = pagoRepository.sumarMontos();

    return new DashboardResponse(
      totalClientes,
      clientesPagados,
      clientesDeudores,
      totalProfesores,
      totalHorasTrabajadas,
      totalLiquidaciones,
      liquidacionesPendientes,
      liquidacionesPagadas,
      recaudacionTotal
    );
  }
}
