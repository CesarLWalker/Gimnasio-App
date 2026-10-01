package com.pesguicom.gimnasio_backend.dto.response;

import com.pesguicom.gimnasio_backend.enums.EstadoCliente;

import java.time.LocalDate;

public record ClienteResponse(

        Long id,
        String nombre,
        String celular,
        EstadoCliente estado,
        LocalDate fechaUltimoPago
) {
}
