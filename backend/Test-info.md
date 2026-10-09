# ¿Qué estamos comprobando?
1. Arrange: creamos dos clientes, preparamos sus respuestas y simulamos lo que devuelve el repositorio y el mapper.
2. Act: llamamos a clienteService.listarClientes().
3. Assert: comprobamos que recibimos dos respuestas y que coinciden con las esperadas.
4. Verify: comprobamos que el servicio consultó el repositorio y convirtió ambos clientes mediante el mapper.
   Algo importante usamos when(...).thenReturn(...) para preparar los resultados simulados. Por eso este test no necesita consultar MySQL.

# ¿Qué estamos verificando?
1. Mapper de entrada
   toEntity(request) transforma el DTO recibido en una entidad Cliente.
2. Repositorio
   save(cliente) simula el guardado y devuelve la entidad guardada.
3. Mapper de salida
   toResponse(clienteGuardado) convierte la entidad en ClienteResponse.

Importante: supuse que ClienteRequest tiene cuatro componentes en el orden nombre, celular, estado y fechaUltimoPago,
y que el tipo de estado admite null. Si tu constructor es diferente, tendremos que adaptar esos argumentos.

# ¿Qué estamos aprendiendo?
- Optional.empty() simula que el cliente no existe.
- assertNull(resultado) verifica que el servicio devuelve null.
- never() comprueba que no se llama al método save().
- verifyNoInteractions(clienteMapper) comprueba que el mapper no se utiliza cuando no hay cliente para actualizar.
  Una observación profesional: devolver null funciona con tu implementación actual, pero más adelante convendría lanzar ResourceNotFoundException, 
- como ya hacés en buscarPorId(). Así mantendríamos un manejo de errores coherente en toda la API.

# ¿Qué estamos comprobando?
- Arrange: preparamos el ID del cliente que queremos eliminar.
- Act: ejecutamos eliminarCliente(id).
- Verify: comprobamos que el repositorio recibió la orden de eliminación con ese mismo ID.
  No necesitamos simular un resultado porque el método devuelve void.

# 
