package com.pesguicom.gimnasio_backend.exception;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

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
  public ResponseEntity<ValidationErrorResponse> handleValidationErrors(
    MethodArgumentNotValidException exception
  ) {

    Map<String, String> errors = exception.getBindingResult()
      .getFieldErrors()
      .stream()
      .collect(Collectors.toMap(
        FieldError::getField,
        error -> error.getDefaultMessage() != null ? error.getDefaultMessage() :  "Error de validación",
        (mensajeExistente, nuevoMensaje) -> mensajeExistente
      ));

    ValidationErrorResponse errorResponse = new ValidationErrorResponse(
      HttpStatus.BAD_REQUEST.value(),
      "Error de validación",
      "Hay errores en los datos enviados",
      errors
    );

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(errorResponse);
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
