package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.request.LiquidacionRequest;
import com.pesguicom.gimnasio_backend.dto.response.LiquidacionResponse;
import com.pesguicom.gimnasio_backend.entity.Liquidacion;
import com.pesguicom.gimnasio_backend.entity.Profesor;
import org.springframework.stereotype.Component;

@Component
public class LiquidacionMapper {

  public Liquidacion toEntity(LiquidacionRequest request, Profesor profesor) {

    return Liquidacion.builder()
      .profesor(profesor)
      .fechaLiquidacion(request.fechaLiquidacion())
      .horasTrabajadas(request.horasTrabajadas())
      .monto(request.monto())
      .estadoLiquidacion(request.estadoLiquidacion())
      .build();
  }

  public LiquidacionResponse toResponse(Liquidacion liquidacion) {

    return new LiquidacionResponse(
      liquidacion.getId(),
      liquidacion.getProfesor().getId(),
      liquidacion.getProfesor().getNombre(),
      liquidacion.getFechaLiquidacion(),
      liquidacion.getHorasTrabajadas(),
      liquidacion.getMonto(),
      liquidacion.getEstadoLiquidacion()
      );
  }

}
