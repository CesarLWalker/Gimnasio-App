# 🏗️ Próximo orden del backend
⏭️ ✅
## Cliente ✅
Entity
Repository
Service
DTO
Mapper
Controller
Validaciones
Manejo de errores
## Profesor ✅
Entity
Repository
Service
DTO
Mapper
Controller
Validaciones
## HorasTrabajadas ✅
Registrar horas
Asociarlas a un profesor
Calcular horas trabajadas
Valor hora
## Liquidaciones ✅
Generar liquidación
Calcular total a pagar
Asociarla al profesor
Estado de liquidación
## Pagos ✅
Registrar pagos de clientes
Historial
Relación con Cliente
## Actividades / Dashboard ✅
Llevar al backend lo que corresponda del dashboard.
## Tests 🧪 ✅
Unitarios
Integración
Controller/API
## Spring Security + JWT 🔐 ✅ ⏭️ 
Login
Usuarios
Roles
Protección de endpoints
## Docker 🐳 ⏭️
Backend
Base de datos
docker-compose
## GitHub + Deploy 🚀 ⏭️
Dejar el proyecto presentable
README profesional
Variables de entorno
Deploy del backend y posteriormente frontend.

## 1. Backend y lógica de negocio
   Implementado y probado en buena parte
   Servicios, entidades, DTO, mappers, validaciones, excepciones, liquidaciones, pagos y dashboard.

## 2. Seguridad profesional
   En progreso
   Revisar permisos por endpoint, probar usuarios con distintos roles, proteger las credenciales y preparar 
   la autenticación que utilizará el frontend. Basic Auth sirve para nuestras pruebas actuales; 
   para una aplicación web real evaluaremos JWT u otra estrategia adecuada.

## 3. Completar la estrategia de testing
   Próxima etapa recomendada
   Revisar los tests existentes, agregar pruebas para casos límite y errores, comprobar controladores
   y seguridad, y sumar pruebas de integración donde aporten valor.

## 4. Documentación de la API
   Incorporar Swagger/OpenAPI, describir endpoints, parámetros, respuestas y autenticación. 
   Esto facilita el trabajo de otros desarrolladores y de QA.

## 5. Calidad y entrega
   Medir cobertura con JaCoCo, automatizar tests en CI con GitHub Actions y preparar 
   perfiles de configuración para desarrollo y producción.

## 6. Frontend y despliegue
   Integrar Angular e Ionic cuando corresponda, configurar CORS, conectar el frontend con la API y 
   preparar el despliegue con su base de datos y variables de entorno.
   
