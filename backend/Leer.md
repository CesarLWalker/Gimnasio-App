# Exception Error
status     → 404, 400, 500, etc.
error      → descripción general del error
message    → explicación concreta
timestamp  → cuándo ocurrió

Por ejemplo, nuestro backend podría devolver:

{
"status": 404,
"error": "Recurso no encontrado",
"message": "Cliente con id 25 no encontrado",
"timestamp": "2026-10-03T03:20:15"
}

# 👍 GlobalExceptionHandler.

Este componente será el encargado de capturar las excepciones y convertirlas en respuestas HTTP claras.

# return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(errorResponse);
Spring devolverá una respuesta HTTP 404 Not Found junto con nuestro ErrorResponse.

# Clases
Mapper -> transforma datos de un formato a otro
Request → datos que entran
Response → datos que salen
Entity → datos que persisten

