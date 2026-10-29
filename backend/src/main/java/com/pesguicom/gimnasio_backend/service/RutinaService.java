package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.RutinaRequest;
import com.pesguicom.gimnasio_backend.dto.response.RutinaResponse;
import com.pesguicom.gimnasio_backend.entity.Rutina;
import com.pesguicom.gimnasio_backend.mapper.RutinaMapper;
import com.pesguicom.gimnasio_backend.repository.RutinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RutinaService {

    private final RutinaRepository rutinaRepository;
    private final RutinaMapper rutinaMapper;

    public RutinaService(RutinaRepository rutinaRepository, RutinaMapper rutinaMapper) {
        this.rutinaRepository = rutinaRepository;
        this.rutinaMapper = rutinaMapper;
    }

    @Transactional(readOnly = true)
    public List<RutinaResponse> listarTodas() {
        return rutinaRepository.findAll()
                .stream()
                .map(rutinaMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public RutinaResponse buscarPorId(Long id) {
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró la rutina con ID: " + id));
        return rutinaMapper.toResponse(rutina);
    }

    public RutinaResponse crear(RutinaRequest request) {
        Rutina rutina = rutinaMapper.toEntity(request);

        Rutina rutinaGuardada = rutinaRepository.save(rutina);

        return rutinaMapper.toResponse(rutinaGuardada);
    }

    public RutinaResponse actualizar(Long id, RutinaRequest request) {
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró la rutina con ID: " + id));

        rutinaMapper.updateEntity(request, rutina);

        Rutina rutinaActualizada = rutinaRepository.save(rutina);

        return rutinaMapper.toResponse(rutinaActualizada);
    }

    public void eliminar(Long id) {
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró la rutina con ID: " + id));

        rutinaRepository.delete(rutina);
    }
}
