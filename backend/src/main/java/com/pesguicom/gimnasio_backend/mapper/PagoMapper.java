package com.pesguicom.gimnasio_backend.mapper;

import com.pesguicom.gimnasio_backend.dto.response.PagoResponse;
import com.pesguicom.gimnasio_backend.entity.Pago;
import org.springframework.stereotype.Component;

@Component
public class PagoMapper {

  public PagoResponse toResponse(Pago pago) {

    return new PagoResponse(
      pago.getId(),
      pago.getCliente().getId(),      // obtiene ID del cliente
      pago.getCliente().getNombre(),  // obtiene NOMBRE del cliente
      pago.getFecha(),
      pago.getMonto(),
      pago.getTipoPago()
    );
  }
}
