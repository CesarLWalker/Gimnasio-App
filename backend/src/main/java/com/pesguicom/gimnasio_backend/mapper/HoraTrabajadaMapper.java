package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.response.HoraTrabajadaResponse;
import com.pesguicom.gimnasio_backend.entity.HoraTrabajada;
import org.springframework.stereotype.Component;

@Component
public class HoraTrabajadaMapper {

  public HoraTrabajadaResponse toResponse(HoraTrabajada horaTrabajada) {

    return new HoraTrabajadaResponse(
      horaTrabajada.getId(),
      horaTrabajada.getProfesor().getId(),
      horaTrabajada.getProfesor().getNombre(),
      horaTrabajada.getFecha(),
      horaTrabajada.getHoraEntrada(),
      horaTrabajada.getHoraSalida(),
      horaTrabajada.getHorasTotales()
    );
  }
}
