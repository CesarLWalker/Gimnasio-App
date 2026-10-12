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

# ¿Qué estamos verificando?
- Optional.empty() simula que el profesor no existe.
- assertThrows() comprueba que se lance la excepción esperada.
- assertEquals() verifica el mensaje.
- never() garantiza que el repositorio no intente eliminar un profesor inexistente.

# ¿Qué estamos haciendo?
- @ExtendWith(MockitoExtension.class): integra Mockito con JUnit 5.
- @Mock: crea simulaciones del repositorio y del mapper. No accedemos a MySQL.
- @InjectMocks: crea PagoService e inyecta esas simulaciones.
- @Test: identifica cada prueba que agregaremos.
- assertEquals, assertThrows y similares: permiten verificar resultados y errores.
- verify(...): permite comprobar que el servicio haya llamado al repositorio como corresponde.
  El método setUp() está vacío porque Mockito ya inicializa las dependencias mediante las anotaciones. 
- Podemos quitarlo más adelante; lo dejamos por ahora para que veas la estructura.

# ¿Qué aprendemos con este test?
- List.of(...) prepara una lista con dos pagos simulados.
- findAll() simula la consulta al repositorio.
- El mapper transforma cada Pago en su correspondiente PagoResponse.
- assertEquals(2, resultado.size()) verifica que se devuelvan dos elementos.
- assertSame(...) comprueba que cada posición contenga exactamente la respuesta simulada esperada.

# ¿Qué aprendemos?
- Optional.empty() simula que el repositorio no encuentra el pago.
- assertThrows() verifica que se lance la excepción esperada.
- assertEquals() comprueba que el mensaje sea correcto.
- verifyNoInteractions(pagoMapper) verifica que el mapper no se utilice, porque el servicio se detiene antes de convertir el pago.

# ¿Qué comprobamos?
- existsById(pagoId) simula que el pago existe.
- pagoService.eliminar(pagoId) ejecuta el método real del servicio.
- verify(...) comprueba que se verifique la existencia y que se invoque la eliminación.

# ¿Qué estamos comprobando?
- Optional.of(hora): simula que el registro existe.
- buscarPorId(1L): ejecuta el método real del servicio.
- assertNotNull(resultado): verifica que recibamos una respuesta.
- assertSame(response, resultado): comprueba que el servicio devuelva la respuesta preparada por el mapper.
- verify(...): confirma que se consultó el repositorio y se utilizó el mapper.
  La diferencia con el test de listar() es que ahora buscamos un único registro mediante su ID.

# ¿Qué aprendemos con estos tests?
- toEntity() transforma los datos del request en una entidad.
- save() simula el guardado en la base de datos; no guarda datos reales.
- assertSame() comprueba que el servicio devuelve exactamente la respuesta simulada.
- verifyNoInteractions() comprueba que, si el profesor no existe, no se intenta convertir ni guardar la liquidación.

# ¿Por qué usamos mock(Liquidacion.class)?
Porque queremos verificar que el servicio invoque los cinco setters de la liquidación. 
Al simular la entidad, Mockito puede registrar esas llamadas mediante verify().

# 
