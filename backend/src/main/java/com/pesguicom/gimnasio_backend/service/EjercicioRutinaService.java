package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.response.EjercicioRutinaResponse;
import com.pesguicom.gimnasio_backend.entity.EjercicioRutina;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.EjercicioRutinaMapper;
import com.pesguicom.gimnasio_backend.repository.EjercicioRutinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class EjercicioRutinaService {
    private final EjercicioRutinaRepository ejercicioRepository;
    private final EjercicioRutinaMapper ejercicioMapper;

    public EjercicioRutinaService(EjercicioRutinaRepository ejercicioRepository, EjercicioRutinaMapper ejercicioMapper) {
        this.ejercicioRepository = ejercicioRepository;
        this.ejercicioMapper = ejercicioMapper;
    }

    public List<EjercicioRutinaResponse> listarTodos() {
        return ejercicioRepository.findAll()
                .stream()
                .map(ejercicioMapper::toResponse)
                .toList();
    }

    public EjercicioRutinaResponse buscarPorId(Long id) {
        EjercicioRutina ejercicio = ejercicioRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("No se encontró el ejercicio con ID: " + id));
        return ejercicioMapper.toResponse(ejercicio);
    }
}
