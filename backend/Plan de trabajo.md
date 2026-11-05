Plan de trabajo

## Etapa 1. Backend funcional
En desarrollo avanzado
- Clientes, profesores, horas trabajadas y pagos.
- Liquidaciones y Dashboard.
- DTOs, mappers, validaciones y excepciones.

## Etapa 2. Tests con JUnit y Mockito
- Tests unitarios de los servicios.
- Tests de integración con base de datos.
- Tests de controladores y API REST.
- Verificar errores, validaciones y casos límite.

## Etapa 3. Spring Security + JWT
- Usuarios y contraseñas cifradas.
- Login y generación de tokens JWT.
- Roles y permisos.
- Protección de endpoints.
- Pruebas de autenticación y autorización.

- Próximos pasos
1. Tests automatizados
Completado: Maven terminó con BUILD SUCCESS.

2. Revisar autenticación y permisos JWT
Comprobar que los endpoints administrativos estén protegidos y que los usuarios comunes no puedan acceder.

3. Revisar CORS y conexión con Ionic/Angular
Verificar los orígenes permitidos y que las peticiones con el token funcionen correctamente.

4. Revisar manejo de errores
Confirmar las respuestas 401 y 403 y evitar exponer información sensible.

## Etapa 4. Docker
- Dockerfile para Spring Boot.
- Contenedor de MySQL.
- docker-compose.yml.
- Variables de entorno y persistencia de datos.

## Etapa 5. GitHub profesional
- README con instalación, tecnologías y funcionalidades.
- Arquitectura y documentación de la API.
- Ejemplos de uso y configuración.
- Commits claros y estructura ordenada.

## Etapa 6. Deploy
- Publicar el backend.
- Configurar la base de datos de producción.
- Conectar el frontend Ionic/Angular.
- Publicar la aplicación y comprobar su funcionamiento.
