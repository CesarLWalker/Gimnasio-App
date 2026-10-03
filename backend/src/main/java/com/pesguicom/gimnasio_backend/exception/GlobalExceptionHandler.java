package com.pesguicom.gimnasio_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException exception) {

    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.NOT_FOUND.value(),
      "Recurso no encontrado",
      exception.getMessage()
    );

    return ResponseEntity
      .status(HttpStatus.NOT_FOUND)
      .body(errorResponse);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationErrors(
    MethodArgumentNotValidException exception
  ) {

    String message = exception.getBindingResult()
      .getFieldErrors()
      .stream()
      .map(error -> error.getField() + ": " + error.getDefaultMessage())
      .findFirst()
      .orElse("Error de validación");


    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.BAD_REQUEST.value(),
      "Error de validación",
      message
    );

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
        .

      body(errorResponse);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGeneralException(Exception exception) {
    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.INTERNAL_SERVER_ERROR.value(),
      "Error interno del servidor",
      "Ocurrió un error inesperado en el servidor"
    );

    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(errorResponse);
  }

}
