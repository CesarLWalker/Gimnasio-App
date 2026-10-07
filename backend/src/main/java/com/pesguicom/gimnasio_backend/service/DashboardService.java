package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.response.DashboardResponse;
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
    long totalHorasTrabajadas = horaTrabajadaRepository.count();
    long totalLiquidaciones = liquidacionRepository.count();

    long clientesPagados = 0;
    long clientesDeudores = 0;

    long liquidacionesPendientes = 0;
    long liquidacionesPagadas = 0;

    double totalHoras = 0;
    double recaudacionTotal = 0;

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
