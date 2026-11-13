package com.pesguicom.gimnasio_backend.dto.response;

public record LoginResponse(

  String token,
  String tokenType,
  long expiresIn
) {
}
