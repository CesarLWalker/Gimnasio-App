package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.ProfesorRequest;
import com.pesguicom.gimnasio_backend.dto.response.ProfesorResponse;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.ProfesorMapper;
import com.pesguicom.gimnasio_backend.repository.ProfesorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfesorService {

  private final ProfesorRepository profesorRepository;
  private final ProfesorMapper profesorMapper;

  public ProfesorService(ProfesorRepository profesorRepository, ProfesorMapper profesorMapper) {
    this.profesorRepository = profesorRepository;
    this.profesorMapper = profesorMapper;
  }

  public ProfesorResponse crear(ProfesorRequest request) {
    Profesor profesor = profesorMapper.toEntity(request);

    Profesor profesorGuardado = profesorRepository.save(profesor);

    return profesorMapper.toResponse(profesorGuardado);
  }

  public List<ProfesorResponse> listar() {

    return profesorRepository.findAll()
      .stream()
      .map(profesorMapper::toResponse)
      .toList();
  }

  public ProfesorResponse buscarPorId(Long id) {
    Profesor profesor = profesorRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Profesor con id " + id + " no encontrado"));

    return profesorMapper.toResponse(profesor);
  }

  public ProfesorResponse actualizar(Long id, ProfesorRequest request) {
    Profesor profesor = profesorRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Profesor con id " + id + " no encontrado"));

    profesorMapper.updateEntity(profesor, request);

    Profesor profesorActualizado = profesorRepository.save(profesor);

    return profesorMapper.toResponse(profesorActualizado);
  }

  public void eliminar(Long id) {

    Profesor profesor = profesorRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Profesor con id " + id + " no encontrado"));

    profesorRepository.delete(profesor);
  }

}
