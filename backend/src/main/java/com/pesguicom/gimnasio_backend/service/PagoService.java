package com.pesguicom.gimnasio_backend.service;

import com.pesguicom.gimnasio_backend.dto.request.PagoRequest;
import com.pesguicom.gimnasio_backend.dto.response.PagoResponse;
import com.pesguicom.gimnasio_backend.entity.Cliente;
import com.pesguicom.gimnasio_backend.entity.Pago;
import com.pesguicom.gimnasio_backend.exception.ResourceNotFoundException;
import com.pesguicom.gimnasio_backend.mapper.PagoMapper;
import com.pesguicom.gimnasio_backend.repository.ClienteRepository;
import com.pesguicom.gimnasio_backend.repository.PagoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.Callable;

@Service
public class PagoService {

  private final PagoRepository pagoRepository;
  private final ClienteRepository clienteRepository;
  private final PagoMapper pagoMapper;

  public PagoService(PagoRepository pagoRepository, ClienteRepository clienteRepository, PagoMapper pagoMapper) {
    this.pagoRepository = pagoRepository;
    this.clienteRepository = clienteRepository;
    this.pagoMapper = pagoMapper;
  }

  public PagoResponse crear(PagoRequest request) {

    Cliente cliente = clienteRepository.findById(request.clienteId())
      .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + request.clienteId()));

    Pago pago = Pago.builder()
      .cliente(cliente)
      .fecha(request.fecha())
      .monto(request.monto())
      .tipoPago(request.tipoPago())
      .build();

    Pago guardado = pagoRepository.save(pago);

    return pagoMapper.toResponse(guardado);
  }

  public List<PagoResponse> listar() {

    return pagoRepository.findAll()
      .stream()
      .map(pagoMapper::toResponse)
      .toList();
  }

  public PagoResponse buscarPorId(Long id) {

    Pago pago = pagoRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado con id: " + id));

    return pagoMapper.toResponse(pago);
  }

  public PagoResponse actualizar(Long id, PagoRequest request) {

    Pago pago = pagoRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado con id: " + id));

    Cliente cliente = clienteRepository.findById(request.clienteId())
      .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + request.clienteId()));

    pago.setCliente(cliente);
    pago.setFecha(request.fecha());
    pago.setMonto(request.monto());
    pago.setTipoPago(request.tipoPago());

    Pago actualizado = pagoRepository.save(pago);

    return pagoMapper.toResponse(actualizado);
  }

  public void eliminar(Long id) {

    if (!pagoRepository.existsById(id)) {
      throw new ResourceNotFoundException("Pago no encontrado con id: " + id);
    }

    pagoRepository.deleteById(id);
  }

}
