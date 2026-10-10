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

# ¿Qué hace cada anotación?
- @ExtendWith(MockitoExtension.class): integra Mockito con JUnit 5.
- @Mock: crea versiones simuladas del repositorio y del mapper.
- @InjectMocks: crea el servicio e inyecta esos objetos simulados.

# ¿Qué aprendemos con assertSame()?
- assertEquals() comprueba que dos objetos sean iguales según su método equals().
- assertSame() comprueba que ambos sean exactamente la misma instancia.

# ¿Qué estamos comprobando?
- Optional.empty() simula que el profesor no existe.
- assertThrows() verifica que se lance la excepción esperada.
- assertEquals() comprueba que el mensaje sea correcto.
- verifyNoInteractions(profesorMapper) confirma que el mapper no se utiliza cuando ocurre el error.
  Esto es importante porque el servicio debe detenerse en la búsqueda fallida, sin intentar convertir un profesor inexistente.

# ¿Qué estamos comprobando?
El test verifica que se complete correctamente todo el recorrido de crear():
1. toEntity(request) convierte el DTO en una entidad.
2. save(profesor) guarda la entidad en el repositorio simulado.
3. toResponse(profesorGuardado) transforma la entidad guardada en una respuesta.
4. assertSame() verifica que el servicio devuelva la respuesta generada por el mapper.
   Recordá que Mockito simula el repositorio: este test no inserta ningún registro en MySQL.

# ¿Qué tiene de especial este test?
La línea más importante es:

    verify(profesorMapper).updateEntity(profesorExistente, request);

Estamos comprobando que el servicio delegue la actualización de los campos al mapper, tal como lo diseñaste. 
Además, verificamos que el repositorio guarde el profesor existente y que la respuesta sea la esperada.
Importante: si el método updateEntity() está definido para modificar directamente la entidad recibida, este test verifica que se invoque;
todavía no comprueba individualmente que cada campo haya cambiado. Podemos agregar esa comprobación después.

# ¿Qué comprobamos?
- Optional.empty() simula que el profesor no existe.
- assertThrows() verifica que se lance la excepción correcta.
- assertEquals() comprueba el mensaje de error.
- never() verifica que no se intente guardar un profesor.
- verifyNoInteractions() confirma que el mapper no se utilice.
  Esto demuestra que el servicio interrumpe la operación cuando falla la búsqueda, sin modificar ni guardar información.

# ¿Qué estamos comprobando?
- Que el servicio busque al profesor por su ID.
- Que, si existe, llame a delete() con la entidad encontrada.
- Que la operación se ejecute sin lanzar una excepción.
  Observá que tu servicio usa delete(profesor), no deleteById(id). Por eso verificamos exactamente el método que implementaste.

# 
