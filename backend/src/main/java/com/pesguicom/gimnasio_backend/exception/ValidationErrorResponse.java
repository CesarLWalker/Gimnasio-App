package com.pesguicom.gimnasio_backend.exception;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
public class ValidationErrorResponse {

  private final int status;
  private final String error;
  private final String message;
  private final LocalDateTime timestamp;
  private final Map<String, String> errors;

  public ValidationErrorResponse(int status, String error, String message, Map<String, String> errors) {
    this.status = status;
    this.error = error;
    this.message = message;
    this.errors = errors;
    this.timestamp = LocalDateTime.now();
  }

}
