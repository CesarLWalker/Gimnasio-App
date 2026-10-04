package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.HoraTrabajadaRequest;
import com.pesguicom.gimnasio_backend.dto.response.HoraTrabajadaResponse;
import com.pesguicom.gimnasio_backend.entity.HoraTrabajada;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.HoraTrabajadaMapper;
import com.pesguicom.gimnasio_backend.repository.HoraTrabajadaRepository;
import com.pesguicom.gimnasio_backend.repository.ProfesorRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class HoraTrabajadaService {

  private final HoraTrabajadaRepository horaTrabajadaRepository;
  private final ProfesorRepository profesorRepository;
  private final HoraTrabajadaMapper horaTrabajadaMapper;

  public HoraTrabajadaService(
    HoraTrabajadaRepository horaTrabajadaRepository,
    ProfesorRepository profesorRepository,
    HoraTrabajadaMapper horaTrabajadaMapper
  ) {
    this.horaTrabajadaRepository = horaTrabajadaRepository;
    this.profesorRepository = profesorRepository;
    this.horaTrabajadaMapper = horaTrabajadaMapper;
  }

  public HoraTrabajadaResponse crear(HoraTrabajadaRequest request) {

    Profesor profesor = profesorRepository.findById(request.profesorId())
      .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado"));

    validarHorarios(request);

    double horasTotales = calcularHoras(
      request.horaEntrada(),
      request.horaSalida()
    );

    HoraTrabajada horaTrabajada = HoraTrabajada.builder()
      .profesor(profesor)
      .fecha(request.fecha())
      .horaEntrada(request.horaEntrada())
      .horaSalida(request.horaSalida())
      .horasTotales(horasTotales)
      .build();

    HoraTrabajada guardada = horaTrabajadaRepository.save(horaTrabajada);

    return horaTrabajadaMapper.toResponse(guardada);
  }

  public List<HoraTrabajadaResponse> listar() {

    return horaTrabajadaRepository.findAll()
      .stream()
      .map(horaTrabajadaMapper::toResponse)
      .toList();
  }

  public HoraTrabajadaResponse buscarPorId(Long id) {

    HoraTrabajada horaTrabajada = horaTrabajadaRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Hora trabajada no encontrada"));

    return horaTrabajadaMapper.toResponse(horaTrabajada);
  }

  public HoraTrabajadaResponse actualizar(Long id, HoraTrabajadaRequest request) {

    HoraTrabajada horaTrabajada = horaTrabajadaRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Hora trabajada no encontrada para id: " + id));

    Profesor profesor = profesorRepository.findById(request.profesorId())
      .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + request.profesorId()));

    validarHorarios(request);

    double horasTotales = calcularHoras(
      request.horaEntrada(),
      request.horaSalida()
    );

    horaTrabajada.setProfesor(profesor);
    horaTrabajada.setFecha(request.fecha());
    horaTrabajada.setHoraEntrada(request.horaEntrada());
    horaTrabajada.setHoraSalida(request.horaSalida());
    horaTrabajada.setHorasTotales(horasTotales);

    HoraTrabajada actualizada = horaTrabajadaRepository.save(horaTrabajada);

    return horaTrabajadaMapper.toResponse(actualizada);
  }

  public void eliminar(Long id) {

    if (!horaTrabajadaRepository.existsById(id)) {
      throw new ResourceNotFoundException("Hora trabajada no encontrada");
    }

    horaTrabajadaRepository.deleteById(id);
  }

  private void validarHorarios(HoraTrabajadaRequest request) {

    if (!request.horaSalida().isAfter(request.horaEntrada())) {
      throw new ResourceNotFoundException("La hora de salida debe ser posterior a la hora de entrada");
    }
  }

  private double calcularHoras(
    java.time.LocalTime horaEntrada,
    java.time.LocalTime horaSalida
  ) {
    long minutos = Duration.between(horaEntrada, horaSalida).toMinutes();

    return minutos / 60.0;
  }

}
